import { getPythonDocs } from "./mcp/pythonDocsTool";

async function main() {
  const result = await getPythonDocs("loops");
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);