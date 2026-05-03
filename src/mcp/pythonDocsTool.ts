// src/mcp/pythonDocsTool.ts

type PythonDocSection = {
  title: string;
  paragraphs: string[];
};

type PythonDocsResult = {
  source: string;
  topic: string;
  url: string;
  sections: PythonDocSection[];
};

const PYTHON_DOC_PAGES: Record<string, string> = {
  loops: "https://docs.python.org/3/tutorial/controlflow.html",
  functions: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
  lists: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists",
  dictionaries: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries",
  classes: "https://docs.python.org/3/tutorial/classes.html",
  exceptions: "https://docs.python.org/3/tutorial/errors.html",
};

const SEARCH_TERMS: Record<string, string> = {
  loops: "for Statements",
  functions: "Defining Functions",
  lists: "More on Lists",
  dictionaries: "Dictionaries",
  classes: "Classes",
  exceptions: "Errors and Exceptions",
};

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<aside[\s\S]*?<\/aside>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractRelevantSection(text: string, searchTerm: string) {
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());

  if (index === -1) {
    return text.slice(0, 1800);
  }

  return text.slice(index, index + 1800);
}

function formatIntoSections(text: string, title: string): PythonDocSection[] {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return [
    {
      title,
      paragraphs: sentences.slice(0, 3),
    },
    {
      title: "Details",
      paragraphs: sentences.slice(3, 7),
    },
  ].filter((section) => section.paragraphs.length > 0);
}

export async function getPythonDocs(
  topic: string
): Promise<PythonDocsResult> {
  const normalizedTopic = topic.toLowerCase().trim();

  const url =
    PYTHON_DOC_PAGES[normalizedTopic] ??
    "https://docs.python.org/3/tutorial/index.html";

  const searchTerm = SEARCH_TERMS[normalizedTopic] ?? normalizedTopic;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Python docs for topic: ${topic}`);
  }

  const html = await response.text();
  const cleanText = stripHtml(html);
  const relevantText = extractRelevantSection(cleanText, searchTerm);
  const sections = formatIntoSections(relevantText, searchTerm);

  return {
    source: "Official Python Documentation",
    topic,
    url,
    sections,
  };
}