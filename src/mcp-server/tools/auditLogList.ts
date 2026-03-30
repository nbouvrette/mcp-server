import { auditLogList } from "../../funcs/auditLogList.js";
import * as operations from "../../models/operations/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: operations.GetAuditLogEntriesRequest$inboundSchema,
};

export const tool$auditLogList: ToolDefinition<typeof args> = {
  name: "get-audit-log-entries",
  description:
    `Fetches audit log entries for your LaunchDarkly account.

## Querying a specific flag's history (most common use case)

Use the \`spec\` parameter with format: proj/<projectKey>:env/*:flag/<flagKey>

IMPORTANT: You MUST include the env/ level. You cannot skip it. Use env/* for all environments.

Examples:
- All environments: spec = "proj/default:env/*:flag/my-flag-key"
- Single environment: spec = "proj/default:env/production:flag/my-flag-key"

WRONG (will return 400): "proj/default:flag/my-flag-key" — missing env/ level.

## Pagination

The API returns at most 20 entries per call (limit max = 20). Results are ordered newest-first. To paginate backward through older history, take the \`date\` field (Unix ms) of the oldest entry in the current page and pass it as the \`before\` parameter in the next call.

## Other filters

- \`q\`: Full-text search (broad, may return unrelated results — prefer \`spec\` for flag history).
- \`after\` / \`before\`: Unix epoch timestamps in milliseconds to bound the date range.
- \`limit\`: Number of entries to return (1–20, default 10).
`,
  scopes: ["read"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await auditLogList(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
