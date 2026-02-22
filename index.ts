/**
 * Tesla extension entry point.
 *
 * Registers the `tesla` tool (opt-in) so the AI agent can control
 * a Tesla vehicle via the Fleet API.
 */

import type { AnyAgentTool, OpenClawPluginApi } from "openclaw/plugin-sdk";
import { createTeslaTool } from "./src/tesla-tool.js";

export default function register(api: OpenClawPluginApi) {
  // Register as optional + factory so the tool is only created when explicitly
  // enabled and skipped in sandboxed contexts (vehicle commands are side-effectful).
  api.registerTool(
    (ctx: { sandboxed?: boolean }) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createTeslaTool(api) as AnyAgentTool;
    },
    { optional: true },
  );
}
