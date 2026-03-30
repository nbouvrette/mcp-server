import * as z from "zod/v3";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type GetAuditLogEntriesRequest = {
  before?: number | undefined;
  after?: number | undefined;
  q?: string | undefined;
  limit?: number | undefined;
  spec?: string | undefined;
};

/** @internal */
export const GetAuditLogEntriesRequest$inboundSchema: z.ZodType<
  GetAuditLogEntriesRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  before: z.number().int().optional().describe("Unix epoch ms. Return entries older than this timestamp. Use for pagination: pass the 'date' of the last entry from the previous page."),
  after: z.number().int().optional().describe("Unix epoch ms. Return entries newer than this timestamp."),
  q: z.string().optional().describe("Full-text search. Broad — prefer 'spec' for flag history."),
  limit: z.number().int().optional().describe("Number of entries to return, 1-20. Default 10. Max 20."),
  spec: z.string().optional().describe("Resource specifier to filter by resource. For flag history use: proj/<projectKey>:env/*:flag/<flagKey>. The env/ level is REQUIRED — use env/* for all environments. WRONG: proj/default:flag/x. CORRECT: proj/default:env/*:flag/x."),
});

/** @internal */
export type GetAuditLogEntriesRequest$Outbound = {
  before?: number | undefined;
  after?: number | undefined;
  q?: string | undefined;
  limit?: number | undefined;
  spec?: string | undefined;
};

/** @internal */
export const GetAuditLogEntriesRequest$outboundSchema: z.ZodType<
  GetAuditLogEntriesRequest$Outbound,
  z.ZodTypeDef,
  GetAuditLogEntriesRequest
> = z.object({
  before: z.number().int().optional(),
  after: z.number().int().optional(),
  q: z.string().optional(),
  limit: z.number().int().optional(),
  spec: z.string().optional(),
});

export function getAuditLogEntriesRequestToJSON(
  req: GetAuditLogEntriesRequest,
): string {
  return JSON.stringify(
    GetAuditLogEntriesRequest$outboundSchema.parse(req),
  );
}

export function getAuditLogEntriesRequestFromJSON(
  jsonString: string,
): SafeParseResult<GetAuditLogEntriesRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAuditLogEntriesRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAuditLogEntriesRequest' from JSON`,
  );
}
