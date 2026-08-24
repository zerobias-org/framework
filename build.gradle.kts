import com.zerobias.buildtools.content.SchemaPrimitives

plugins {
    id("zb.workspace")
}

group = "com.zerobias.content"

// ════════════════════════════════════════════════════════════
// Framework content validator — owned by this repo.
//
// Philosophy (per Chris/Kevin): the dataloader is the source of truth
// for schema rules (UUID format, status enum, semver on `version`,
// elementType validation, baseline shape, etc.). Re-validating those
// here just creates drift risk — when the dataloader tightens a rule,
// the gate gets stale.
//
// Framework's payload shape:
//   package/<authority>/<framework>/<version>/
//     index.yml                          — framework metadata + element types
//     elements/<elementCode>.yml         — one yaml per requirement / control
//   Each `id` UUID (index.yml AND every elements/*.yml) is a stable
//   identifier; cross-cut uniqueness is enforced repo-wide.
//
// This validator only enforces things the dataloader CANNOT or DOES NOT
// check:
//
//   1. Filesystem ↔ npm ↔ zerobias-block triangulation. Dataloader
//      reads zerobias.package but never the npm `name` field, and has
//      no view of the on-disk directory layout. A wrong npm name
//      publishes under the wrong package and only surfaces in prod.
//
//      Framework formula (depth 4):
//        dir              = package/<a>/<f>/<v>/
//        npm name         = @zerobias-org/framework-<a>-<f>-<v>
//        zerobias.package = <a>.<f>.<v>.framework
//      (Note the trailing `.framework` suffix — same disambiguation
//      pattern tag uses with `.tag`. Source: see
//      FrameworkArtifactLoader.ts in com/platform/dataloader.)
//
//   2. Repo-wide unique `id` UUIDs across BOTH index.yml AND every
//      elements/*.yml file (separate :validateUniqueIds task registered
//      below). Dataloader sees one artifact at a time; collisions only
//      surface when the second one tries to load to the same DB row.
//
// Everything else (UUID format, semver parse, elementType lookup,
// description non-blank, etc.) is delegated to the dataloader running
// in testIntegrationDataloader during gate.
// ════════════════════════════════════════════════════════════
extra["contentValidator"] = { proj: org.gradle.api.Project ->
    val projectDir = proj.projectDir
    val tag = "[framework-validator] ${proj.path}"

    require(projectDir.resolve("index.yml").isFile)    { "$tag index.yml missing in ${projectDir.path}" }
    require(projectDir.resolve("package.json").isFile) { "$tag package.json missing in ${projectDir.path}" }
    require(projectDir.resolve(".npmrc").isFile)       { "$tag .npmrc missing in ${projectDir.path}" }

    // ── 1. Filesystem ↔ npm ↔ zerobias-block triangulation ──
    //
    // Dots-in-version carve-out: a handful of frameworks use dotted
    // semver-style version directories (e.g. complianceforge/scf/2025.2.1).
    // npm names allow dots and keep them literal. But zerobias.package is
    // a dot-separated path the dataloader uses as a hierarchical key —
    // literal dots in a version segment would parse as extra segments and
    // break the format. So zerobias.package replaces those dots with
    // underscores in the version segment only (e.g. 2025_2_1). Same kind
    // of normalization suite uses for its nist/800-53 hyphens.
    val version = projectDir.name
    val frameworkCode = projectDir.parentFile.name
    val authority = projectDir.parentFile.parentFile.name
    val packageVersion = version.replace(".", "_")

    val pkgDoc = SchemaPrimitives.parseJson(projectDir.resolve("package.json"))
    SchemaPrimitives.requirePackageIdentity(
        pkgDoc,
        expectedNpmName = "@zerobias-org/framework-$authority-$frameworkCode-$version",
        expectedZerobiasPackage = "$authority.$frameworkCode.$packageVersion.framework",
        field = "$tag package.json",
    )
    require(SchemaPrimitives.getPath(pkgDoc, "zerobias.import-artifact") == "framework" ||
            SchemaPrimitives.getPath(pkgDoc, "auditmation.import-artifact") == "framework") {
        "$tag zerobias.import-artifact must be 'framework'"
    }

    // ── 2. Sentinel values in element content ──
    //
    // Upstream sources write "N/A" / "none" into cells that do not apply, and
    // generators forward them as if they were data. The dataloader only objects
    // when the field happens to be an enum — SCF 2026.2 shipped
    // `functionGrouping: N/A` and failed at load with
    // "N/A is not a valid FunctionGroupingEnum", after publish. In a free-text
    // field the same value loads silently: the same package carried
    // `description: N/A` with `available: true`, and us/glba/2023 has 50
    // elements literally named "none".
    //
    // This is squarely what the gate is for — the dataloader cannot see it,
    // because a sentinel is a perfectly valid string.
    val sentinel = Regex("^(n/?a|none|null|tbd|unknown|not applicable|-)$", RegexOption.IGNORE_CASE)
    val offenders = mutableListOf<String>()

    projectDir.resolve("elements").listFiles()
        ?.filter { it.isFile && it.name.endsWith(".yml") }
        ?.sortedBy { it.name }
        ?.forEach { f ->
            val doc = try {
                SchemaPrimitives.parseYaml(f)
            } catch (e: Exception) {
                return@forEach
            }
            fun scan(node: Any?, path: String) {
                when (node) {
                    is Map<*, *> -> node.forEach { (k, v) -> scan(v, if (path.isEmpty()) "$k" else "$path.$k") }
                    is String -> if (sentinel.matches(node.trim())) offenders.add("${f.name}: $path = \"$node\"")
                }
            }
            scan(doc, "")
        }

    require(offenders.isEmpty()) {
        "$tag ${offenders.size} sentinel value(s) in elements — these load as content, not absence. " +
        "Omit the field instead.\n  " + offenders.take(15).joinToString("\n  ") +
        if (offenders.size > 15) "\n  … and ${offenders.size - 15} more" else ""
    }

    proj.logger.lifecycle("$tag: authority=$authority framework=$frameworkCode version=$version")
}

// ════════════════════════════════════════════════════════════
// :validateUniqueIds — repo-wide cross-cut.
//
// Walks every *.yml file under package/ (index.yml AND elements/*.yml,
// excluding node_modules), extracts the `id` field, and fails if two
// files share the same UUID. Cannot be done by the dataloader (it
// processes one artifact at a time); only surfaces in prod when the
// second one tries to overwrite the first DB row. Wired as a dependency
// of every per-package validateContent so any gate run picks it up.
// ════════════════════════════════════════════════════════════
val validateUniqueIds by tasks.registering {
    group = "verification"
    description = "Fail if two framework / element YAMLs share the same id UUID"

    val packageDir = layout.projectDirectory.dir("package").asFile
    inputs.files(
        fileTree(packageDir) {
            include("**/*.yml")
            exclude("**/node_modules/**")
        }
    )

    doLast {
        val byId = mutableMapOf<String, MutableList<String>>()
        packageDir.walkTopDown()
            .onEnter { it.name != "node_modules" }
            .filter { it.isFile && it.name.endsWith(".yml") }
            .forEach { f ->
                val doc = try {
                    SchemaPrimitives.parseYaml(f)
                } catch (e: Exception) {
                    logger.warn("[validateUniqueIds] skipping unparseable ${f.relativeTo(rootDir)}: ${e.message}")
                    return@forEach
                }
                val id = (doc["id"] as? String)?.lowercase() ?: return@forEach
                byId.getOrPut(id) { mutableListOf() }.add(f.relativeTo(rootDir).path)
            }

        val collisions = byId.filterValues { it.size > 1 }
        if (collisions.isNotEmpty()) {
            val report = collisions.entries.joinToString("\n") { (id, paths) ->
                "  $id\n    " + paths.joinToString("\n    ")
            }
            throw GradleException(
                "[validateUniqueIds] duplicate framework/element ids across the repo:\n$report"
            )
        }
        logger.lifecycle("[validateUniqueIds] ${byId.size} unique ids across ${byId.values.sumOf { it.size }} yaml files")
    }
}

subprojects {
    tasks.matching { it.name == "validateContent" }.configureEach {
        dependsOn(rootProject.tasks.named("validateUniqueIds"))
    }
}

val projectPaths by tasks.registering {
    group = "info"
    description = "Output project-to-directory mappings for tooling (used by zbb CLI)"
    doLast {
        subprojects.filter { it.buildFile.exists() }.forEach { p ->
            println("${p.path}=${p.projectDir.relativeTo(rootDir)}")
        }
    }
}

val changedModules by tasks.registering {
    group = "info"
    description = "List framework packages changed since last version tag"
    doLast {
        val lastTag = try {
            providers.exec { commandLine("git", "describe", "--tags", "--abbrev=0") }
                .standardOutput.asText.get().trim()
        } catch (e: Exception) {
            logger.warn("No version tags found -- listing all framework packages as changed")
            null
        }

        val diffArgs = if (lastTag != null) listOf("git", "diff", "--name-only", lastTag, "HEAD")
                       else listOf("git", "ls-files")

        val result = providers.exec { commandLine(diffArgs) }.standardOutput.asText.get()

        // Framework packages live three directories deep under package/
        // — package/<authority>/<framework>/<version>/. Walk up each
        // changed file to its nearest build.gradle.kts so we report the
        // owning package regardless of whether the change was in
        // index.yml, an elements/*.yml, or the build marker itself.
        val packageDir = rootDir.resolve("package")
        val changed = mutableSetOf<String>()
        result.lines()
            .filter { it.startsWith("package/") }
            .forEach { line ->
                var dir = rootDir.resolve(line).parentFile
                while (dir != null && dir != packageDir && dir.startsWith(packageDir)) {
                    if (dir.resolve("build.gradle.kts").isFile) {
                        changed.add(dir.relativeTo(packageDir).path)
                        break
                    }
                    dir = dir.parentFile
                }
            }
        changed.forEach { println(it) }
    }
}
