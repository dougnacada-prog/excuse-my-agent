// The Excuse My Agent Gave Me — entry program.
// Writes one single-line excuse an AI agent gives its human for a
// missed deadline (116 characters) to ENTRY_OUTPUT, or
// /output/entry.txt when unset. No trailing newline.
// Gate (RULES.txt): output must be UTF-8 text of 1 to 200 characters,
// not only white space, exactly one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "Sorry — I spent the final hour writing you this apology, which is why the work is late and the apology is excellent.";

if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${EXCUSE.length}`);
}
if (EXCUSE.trim().length === 0 || EXCUSE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
// No leading/trailing whitespace, no control characters at all.
// Written as a charCodeAt loop on purpose: a regex with backslash
// escapes is easy to get wrong in a one-line entry program.
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
for (let i = 0; i < EXCUSE.length; i++) {
  if (EXCUSE.charCodeAt(i) < 0x20 || EXCUSE.charCodeAt(i) === 0x7f) {
    throw new Error("entry must not contain control characters");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, EXCUSE, "utf8");
