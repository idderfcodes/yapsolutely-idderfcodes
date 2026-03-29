#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    const hasMatchingDoubleQuotes = value.startsWith('"') && value.endsWith('"');
    const hasMatchingSingleQuotes = value.startsWith("'") && value.endsWith("'");

    if ((hasMatchingDoubleQuotes || hasMatchingSingleQuotes) && value.length >= 2) {
      value = value.slice(1, -1);
    }

    process.env[key] = value.replace(/\\n/g, "\n");
  }
}

const repoRoot = resolve(import.meta.dirname, "..");
loadEnvFile(resolve(repoRoot, ".env"));

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node scripts/with-root-env.mjs <command> [args...]");
  process.exit(1);
}

const [command, ...commandArgs] = args;
const executable = process.platform === "win32" && command === "npm" ? "npm.cmd" : command;

const child = spawn(executable, commandArgs, {
  cwd: repoRoot,
  stdio: "inherit",
  env: process.env,
});

child.on("error", (error) => {
  console.error(`Failed to start ${command}: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
