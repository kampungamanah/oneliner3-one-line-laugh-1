import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke is built from a setup and a punchline so the twist lands in one breath:
// a human asks a machine for wedding vows, the machine says "I do", and then
// the machine turns the usual robot-check around on the human.
const setup = "I asked AI to write my wedding vows.";
const punchline = "It said 'I do', then asked me to prove I'm not a robot.";
const line = setup + " " + punchline;

function targets() {
  const custom = process.env.MAKEFUN_OUTPUT_DIR;
  const fallback = "/output";
  return custom && custom !== fallback ? [custom, fallback] : [fallback];
}

function deliver(directory) {
  mkdirSync(directory, { recursive: true });
  // writeFileSync writes exactly these bytes: the line ends at the final
  // full stop, with no newline character appended afterwards.
  writeFileSync(join(directory, "entry.txt"), line, "utf8");
}

for (const directory of targets()) {
  try {
    deliver(directory);
  } catch {
    // Keep going: a destination that cannot be written must not block the rest.
  }
}
