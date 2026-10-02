// Element content rules (meta-repo docs/ElementContentRules.md) applied at generation
// time: `description` is one plain line under 200 chars, the full source text goes to
// `<code>-background.md` as markdown that renders.
//
// This is a port of the fix-element-content skill's scripts (rules.py, heur.py, mdconv.py,
// fix.py) — the same logic that fixed SCF 2023.3.1–2026.2 by hand (c1e48cf52). Keep the
// two in sync: summaries are keyed by `textHash`, so a drifting `norm` silently misses
// every stored summary.
import crypto from 'crypto';

const HTML = /<\/?(?:a|b|br|code|div|em|h[1-6]|i|li|ol|p|pre|s|span|strong|sub|sup|table|tbody|td|th|thead|tr|ul)(?:\s[^>]*)?\/?>/i;
const MARKDOWN = [/\*\*[^*]+\*\*/, /\[[^\]]+]\([^)]*\)/, /`[^`]+`/, /^#{1,6}\s/];

export function descriptionViolations(description: string): string[] {
  const t = description.trim();
  const v: string[] = [];
  if (t.length >= 200) v.push('>=200');
  if (/[\n\r]/.test(t)) v.push('newline');
  if (HTML.test(t)) v.push('html');
  if (MARKDOWN.some(r => r.test(t))) v.push('markdown');
  return v;
}

export function norm(t: string): string {
  return t.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();
}

export function textHash(t: string): string {
  return crypto.createHash('sha1').update(norm(t), 'utf8').digest('hex').slice(0, 16);
}

const LISTY = /^\s*(\(?[a-z0-9ivx]{1,4}[.)]|[-*•]|\d+\.)\s/m;

function badShort(s: string): string | null {
  if (s.length < 25 || s.length >= 200) return 'length';
  if (/\*\*|`|\[[^\]]+\]\(|<[a-z/]/.test(s)) return 'markup';
  if (/[:;,]$/.test(s)) return 'colon';
  if (!(/[.!?]$/.test(s) || s.endsWith('."') || s.endsWith('.)'))) return 'no-terminal';
  if (/^\(?[a-z0-9ivx]{1,4}[.)]\s/.test(s)) return 'list-start';
  return null;
}

// heur.plan's "collapse": the only problem is line breaks and the joined text still fits.
function losslessJoin(description: string): string | null {
  const t = description.trim();
  const n = norm(t);
  const listy = LISTY.test(t.replace(/\r\n/g, '\n'));
  const r = badShort(n);
  return n.length < 200 && !listy && (r === null || r === 'no-terminal') ? n : null;
}

const MARK = /^(?:\((?<p>[a-z]{1,4}|\d{1,3})\)|(?<d>[a-z]{1,4}|\d{1,3})[.)])\s+(?<rest>.*)$/i;
const BUL = /^[-*•▪◦·]\s+(?<rest>.*)$/;
const ROMAN = /^(?=[ivxl]+$)(x{0,3})(ix|iv|v?i{0,3})$/i;

function labelKind(tok: string, lastAlpha: string | undefined): 'num' | 'roman' | 'alpha' {
  if (/^\d+$/.test(tok)) return 'num';
  const low = tok.toLowerCase();
  if (low && ROMAN.test(low)) {
    if (low.length > 1) return 'roman';
    // single i/v/x is alpha when it continues an alpha run (h->i, u->v, w->x)
    const prev = ({ i: 'h', v: 'u', x: 'w' } as Record<string, string>)[low];
    return lastAlpha === prev ? 'alpha' : 'roman';
  }
  return 'alpha';
}

// mdconv.to_markdown: paragraphs, "- a." bullets keeping the source label, 4-space nesting
// by label kind, escaped digit labels.
export function toMarkdown(text: string): string {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(l => l.replace(/\s+$/, ''));
  const out: string[] = [];
  let stack: string[] = [];
  let lastAlpha: Record<string, string> = {};
  let inList = false;
  const esc = (s: string) => s.replace(/^([#>+=|])/, '\\$1');
  const enter = (key: string) => {
    const i = stack.indexOf(key);
    if (i >= 0) stack = stack.slice(0, i + 1);
    else stack.push(key);
  };

  for (const raw of lines) {
    if (!raw.trim()) continue;
    const indent = raw.length - raw.replace(/^[ \t]+/, '').length;
    const s = raw.trim();
    const m = MARK.exec(s);
    const b = BUL.exec(s);
    const d = m?.groups?.d;
    if (m && !/^(g|e)\./.test(m.groups!.rest) && !(d && d.length > 1 && !ROMAN.test(d) && !/^\d+$/.test(d))) {
      const paren = m.groups!.p !== undefined;
      const tok = (m.groups!.p ?? d)!;
      const kind = labelKind(tok, lastAlpha[String(paren)]);
      if (kind === 'alpha') lastAlpha[String(paren)] = tok.toLowerCase();
      enter(`${kind}/${paren}`);
      let marker = s.slice(0, s.length - m.groups!.rest.length).trim();
      if (kind === 'num' && !paren) marker = marker.slice(0, -1) + '\\' + marker.slice(-1);
      if (!inList && out.length) out.push('');
      out.push(('    '.repeat(stack.length - 1) + `- ${marker} ${m.groups!.rest}`).replace(/\s+$/, ''));
      inList = true;
    } else if (b) {
      enter('bullet/false');
      if (!inList && out.length) out.push('');
      out.push('    '.repeat(stack.length - 1) + '- ' + esc(b.groups!.rest));
      inList = true;
    } else if (inList && indent > 0) {
      out[out.length - 1] += ' ' + s;   // wrapped continuation of the previous item
    } else {
      if (out.length) out.push('');
      out.push(esc(s));
      inList = false; stack = []; lastAlpha = {};
    }
  }
  return out.join('\n').trim() + '\n';
}

export interface ContentRuleResult {
  description: string;
  background?: string;   // markdown for <code>-background.md
}

export interface MissingSummary {
  code: string;
  hash: string;
  name?: string;
  externalId?: string;
  text: string;
}

// fix.py's decision per element: a stored summary wins (and the original moves to
// background); otherwise a lossless one-line join; otherwise it needs a written summary.
export function applyContentRules(
  description: string,
  summaries: Record<string, string>
): ContentRuleResult | null {
  if (descriptionViolations(description).length === 0) return { description };
  const stored = summaries[textHash(description)];
  if (stored) return { description: stored, background: toMarkdown(description) };
  const joined = losslessJoin(description);
  if (joined) return { description: joined };
  return null;
}
