#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const DEFAULT_SSH_SCRIPT = "/tmp/ssh-vps.sh";
const DEFAULT_REMOTE_REPO_PATH = "/opt/yapsolutely";
const DEFAULT_PHONE_NUMBER = "+13186108198";
const DEFAULT_EVENT_LIMIT = 8;

const config = {
  sshScriptPath: process.env.YAPS_SSH_SCRIPT || DEFAULT_SSH_SCRIPT,
  remoteRepoPath: process.env.YAPS_REMOTE_REPO_PATH || DEFAULT_REMOTE_REPO_PATH,
  phoneNumber: process.env.YAPS_PHONE_NUMBER || DEFAULT_PHONE_NUMBER,
  externalCallId: process.env.YAPS_EXTERNAL_CALL_ID || "",
  eventLimit: normalizeEventLimit(process.env.YAPS_EVENT_LIMIT),
};

function normalizeEventLimit(value) {
  if (!value) {
    return DEFAULT_EVENT_LIMIT;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_EVENT_LIMIT;
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runRemoteSql(sql) {
  const remoteCommand = `cd ${config.remoteRepoPath}/deploy
. ./.env
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -A -F '|' <<'SQL'
${sql}
SQL`;

  return execFileSync(config.sshScriptPath, [remoteCommand], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function escapeSql(value) {
  return value.replace(/'/g, "''");
}

function parseRows(output, columns) {
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      return Object.fromEntries(columns.map((column, index) => [column, parts[index] ?? ""]));
    });
}

function printHeader() {
  console.log("Yapsolutely latest production call\n");
  console.log(`• ssh:   ${config.sshScriptPath}`);
  console.log(`• repo:  ${config.remoteRepoPath}`);
  console.log(`• phone: ${config.phoneNumber}`);
  if (config.externalCallId) {
    console.log(`• call:  ${config.externalCallId}`);
  }
  console.log(`• events shown: ${config.eventLimit}`);
  console.log("");
}

function buildCallQuery() {
  if (config.externalCallId) {
    return `SELECT COALESCE(c."id", ''), COALESCE(c."externalCallId", ''), COALESCE(c."status"::text, ''), COALESCE(c."durationSeconds"::text, ''), COALESCE(c."callerNumber", ''), COALESCE(c."toNumber", ''), COALESCE(c."createdAt"::text, ''), COALESCE(c."startedAt"::text, ''), COALESCE(c."endedAt"::text, ''), COALESCE(a."name", ''), COALESCE(c."summary", ''), COALESCE(COUNT(e."id")::text, '0') FROM "Call" c LEFT JOIN "Agent" a ON a."id" = c."agentId" LEFT JOIN "CallEvent" e ON e."callId" = c."id" WHERE c."externalCallId" = '${escapeSql(config.externalCallId)}' GROUP BY c."id", a."name" ORDER BY c."createdAt" DESC LIMIT 1;`;
  }

  return `SELECT COALESCE(c."id", ''), COALESCE(c."externalCallId", ''), COALESCE(c."status"::text, ''), COALESCE(c."durationSeconds"::text, ''), COALESCE(c."callerNumber", ''), COALESCE(c."toNumber", ''), COALESCE(c."createdAt"::text, ''), COALESCE(c."startedAt"::text, ''), COALESCE(c."endedAt"::text, ''), COALESCE(a."name", ''), COALESCE(c."summary", ''), COALESCE(COUNT(e."id")::text, '0') FROM "Call" c LEFT JOIN "Agent" a ON a."id" = c."agentId" LEFT JOIN "CallEvent" e ON e."callId" = c."id" WHERE c."toNumber" = '${escapeSql(config.phoneNumber)}' GROUP BY c."id", a."name" ORDER BY c."createdAt" DESC LIMIT 1;`;
}

function buildEventQuery(callId) {
  return `SELECT COALESCE("sequence"::text, ''), COALESCE("role"::text, ''), COALESCE(REPLACE(REPLACE("text", E'\n', ' '), E'\r', ' '), ''), COALESCE("createdAt"::text, '') FROM "CallEvent" WHERE "callId" = '${escapeSql(callId)}' ORDER BY "sequence" ASC LIMIT ${config.eventLimit};`;
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

function main() {
  printHeader();

  const [call] = parseRows(runRemoteSql(buildCallQuery()), [
    "id",
    "externalCallId",
    "status",
    "durationSeconds",
    "callerNumber",
    "toNumber",
    "createdAt",
    "startedAt",
    "endedAt",
    "agentName",
    "summary",
    "eventCount",
  ]);

  assert(call, config.externalCallId ? `No call found for externalCallId ${config.externalCallId}.` : `No calls found for ${config.phoneNumber}.`);

  console.log("Latest call");
  console.log(`- agent: ${call.agentName || "<unknown>"}`);
  console.log(`- status: ${call.status || "<unknown>"}`);
  console.log(`- durationSeconds: ${call.durationSeconds || "<empty>"}`);
  console.log(`- from: ${call.callerNumber || "<empty>"}`);
  console.log(`- to: ${call.toNumber || "<empty>"}`);
  console.log(`- externalCallId: ${call.externalCallId || "<empty>"}`);
  console.log(`- createdAt: ${call.createdAt || "<empty>"}`);
  console.log(`- startedAt: ${call.startedAt || "<empty>"}`);
  console.log(`- endedAt: ${call.endedAt || "<empty>"}`);
  console.log(`- eventCount: ${call.eventCount || "0"}`);
  if (call.summary) {
    console.log(`- summary: ${truncate(call.summary, 240)}`);
  }

  const events = parseRows(runRemoteSql(buildEventQuery(call.id)), ["sequence", "role", "text", "createdAt"]);

  if (events.length === 0) {
    console.log("\nNo CallEvent rows found for this call yet.");
    return;
  }

  console.log(`\nRecent events (first ${events.length})`);
  for (const event of events) {
    const text = event.text ? truncate(event.text, 160) : "<no text>";
    console.log(`- #${event.sequence || "?"} ${event.role || "UNKNOWN"}: ${text}`);
  }
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : "Unknown latest-call failure.");
}