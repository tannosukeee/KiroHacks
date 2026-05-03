import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getPythonDocs } from "./pythonDocsTool";

export function createPythonDocsMcpServer() {
  const server = new McpServer({
    name: "python-docs-server",
    version: "1.0.0",
  });

  // Register tool — SDK v1.29 signature: (name, schema shape, callback)
  server.tool(
    "getPythonDocs",
    "Fetch Python documentation for a given topic",
    { topic: z.string() },
    async ({ topic }) => {
      const result = await getPythonDocs(topic);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result),
          },
        ],
      };
    }
  );

  return server;
}