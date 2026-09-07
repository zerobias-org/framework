# templates/

Scaffolding for a **new** framework package. Copy into
`package/<vendor>/<suite>/<version>/` and substitute the placeholders.

Existing packages are not governed by these files — only new ones.

## Files

- **`package.json`** — placeholders `{vendor}`, `{suite}`, `{version}`,
  `{standardName}`, `{target-org-uuid}`.
- **`index.yml`** — framework metadata + `elementTypes`.
- **`elements/`**, **`baselines/`** — one file per requirement / baseline.

## `zerobias.orgId` — set it, then remove it

`orgId` is what makes a package **org-private** rather than shared-catalog.

**Set it before the first `gate`, not later.** The gate's Neon step behaves
differently depending on it: with `orgId` the ephemeral branch is seeded with
the org and the load runs org-scoped, which is what an org-scoped token is
authorized for. Without it the package is treated as global-catalog and an
org-scoped token can 401 the step. The gate stamp's `sourceHash` does not
cover `package.json`, so setting or removing `orgId` never invalidates the
stamp — there is no reason to defer it.

**Remove it when promoting to the shared catalog.** Deleting `orgId` in the
PR that publishes to the catalog is what transfers ownership. The dataloader
guards this deliberately: dropping `orgId` alone is refused unless the
promotion is explicit, so an org's private content cannot become public by
accident.

## `version` must be plain semver

Leave it at `1.0.0`. `OrgPublish.computeOrgVersion` rejects any prerelease or
build metadata:

```
package.json version "1.0.0-rc.0" must be plain semver
(no prerelease/build metadata).
```

CI owns version bumps after the first publish — never hand-edit it.

## Publishing privately to your org

```bash
zbb --slot <slot> publishOrg
```

Runs the normal publish pipeline in org mode
(`./gradlew publishOrg -PorgPublish=true`): publishes
`X.Y.(Z+1)-rc.<orgIdHex32>.<n>` — computed by the build, never hand-authored —
and queues a dataloader job into the org, with no PR and no shared catalog
involvement. It does not tag, push, promote, or emit a release event.

`publishOrg` only accepts artifacts that exist **solely** inside your org. A
package name that already carries plain-semver catalog versions is refused, as
is one whose rc versions belong to a different org. So this is for brand-new
packages, not new releases of catalogued ones.

Required credentials:

| var | what it is |
|---|---|
| `ZB_API_KEY` | org-**admin** key of the target org. A non-admin key fails `verifyOrgPublish`, and the dataloader's `queueJob` enforces the same check server-side. |
| `ZB_TOKEN` | registry key for `pkg.zerobias.org`; also drives the gate's Neon step. Must be prod-issued. |
| `ZB_ORG_ID` | target org UUID — must match `zerobias.orgId` here. |

These are **not** declared in this repo. They live once per slot on the shared
`dev` stack (`@zerobias-org/dev-stack`) and this repo imports them — see the
`depends:` / `imports:` block in `zbb.yaml`. Seed them there, once:

```bash
zbb --slot <slot> --stack dev env set ZB_API_KEY <org-admin-key> >/dev/null
```

Every importing stack then resolves the value transitively.
`scripts/setup-org-credentials.sh` does this for you.

> ⚠️ **Never `env set` these on the `framework` stack.** A per-stack override
> permanently shadows the import — zbb never clobbers a user override — so
> credential rotation on the dev stack silently stops reaching this repo.

> The `>/dev/null` is deliberate: `zbb env set` currently echoes the value in
> cleartext even for `mask: true` vars.

Set them in the slot, not the shell — a plain `export` does not reach the
gradle build, because zbb seals the env.

## Registry

`publishConfig.registry` is `https://pkg.zerobias.org/`, which is also what
`OrgPublish` classifies and publishes against by default. Both ends agree, so
this repo needs **no** `PUBLISH_ORG_REGISTRY_URL` override.

Do not copy one in from `auditlogic/framework_new`. That repo pins the org
publish to GitHub Packages because `@auditlogic` is proxy-only on the verdaccio
and returns `403` on publish; `@zerobias-org` does not have that problem, and
importing the pin here would split classify and publish across two registries.
