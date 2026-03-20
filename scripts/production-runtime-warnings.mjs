#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const DEFAULT_SSH_SCRIPT = "/tmp/ssh-vps.sh";
const DEFAULT_REMOTE_REPO_PATH = "/opt/yapsolutely";
const DEFAULT_TAIL_LINES = 200;
const WARNING_PREFIX = "[yapsolutely-runtime]";

const config = {
  sshScriptPath: process.env.YAPS_SSH_SCRIPT || DEFAULT_SSH_SCRIPT,
  remoteRepoPath: process.env.YAPS_REMOTE_REPO_PATH || DEFAULT_REMOTE_REPO_PATH,
  tailLines: normalizeTailLines(process.env.YAPS_LOG_TAIL_LINES),
};

function normalizeTailLines(value) {
  if (!value) {
    return DEFAULT_TAIL_LINES;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TAIL_LINES;
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function runRemoteLogs() {
  const remoteCommand = `cd ${config.remoteRepoPath}/deploy
. ./.env
docker compose logs voice --tail ${config.tailLines} --no-color`;

  return execFileSync(config.sshScriptPath, [remoteCommand], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function main() {
  console.log("Yapsolutely production runtime warnings\n");
  console.log(`• ssh:  ${config.sshScriptPath}`);
  console.log(`• repo: ${config.remoteRepoPath}`);
  console.log(`• tail: ${config.tailLines} voice log lines`);
  console.log("");

  const rawLogs = runRemoteLogs();
  const warningLines = rawLogs
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.includes(WARNING_PREFIX));

  if (warningLines.length === 0) {
    console.log(`✅ No ${WARNING_PREFIX} warnings found in the most recent voice logs.`);
    console.log("If a real call just failed, increase YAPS_LOG_TAIL_LINES and retry immediately.");
    return;
  }

  console.log(`⚠️ Found ${warningLines.length} recent ${WARNING_PREFIX} warning line(s):\n`);

  for (const line of warningLines) {
    console.log(line);
  }

  console.log("\nTip: run this immediately after a live call issue so the relevant warning stays within the tailed log window.");
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : "Unknown runtime-log failure.");
}