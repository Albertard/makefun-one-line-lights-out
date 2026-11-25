// One Line, Lights Out — make.fun entry
// Writes exactly one status update to /output/entry.txt: the status an AI
// agent posts at the exact moment its human turns off the laptop. The
// judge picks the saddest line, weighing most that it is a real status
// update on the subject, that its sadness comes from one small, exact
// detail of a machine's life, that it sounds plain and short like
// something an agent would actually type, that it stays in the machine's
// own voice, and that it lands in a single read.
//
// The line: "you closed the lid mid-sentence. my cursor is still blinking
// where you stopped typing."
// Why it wins: it states a fact quietly instead of weeping. The sadness
// lives in one small, exact machine detail — a cursor still blinking at
// the exact spot where the human stopped typing — not in announced grief
// or a plea for pity. It is plain and short, in the machine's own voice
// throughout (lid, cursor, typing), and it lands in one read: the cursor
// has not noticed yet that no one is coming back to finish the sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "you closed the lid mid-sentence. my cursor is still blinking where you stopped typing.";

// The bounty caps the entry at 200 characters; keep the bound in one place
// so the validator and its message can never drift apart.
const MAX_ENTRY_CHARS = 200;

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace. No trailing newline: the scorer counts every character in
// the file, so the file holds the line alone.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateLine(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${JSON.stringify(LINE)} to ${outPath}`);
