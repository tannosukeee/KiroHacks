import { getPythonDocs } from "../mcp/pythonDocsTool";
import type { DocReference } from "../shared/contracts";

/** Maps common concept names to Python doc topics. */
const CONCEPT_TO_TOPIC: Record<string, string> = {
  "for loop": "loops",
  "while loop": "loops",
  "loop": "loops",
  "iteration": "loops",
  "function": "functions",
  "def": "functions",
  "parameter": "functions",
  "argument": "functions",
  "return value": "functions",
  "list": "lists",
  "array": "lists",
  "list comprehension": "lists",
  "append": "lists",
  "dictionary": "dictionaries",
  "dict": "dictionaries",
  "key-value": "dictionaries",
  "class": "classes",
  "object": "classes",
  "inheritance": "classes",
  "constructor": "classes",
  "method": "classes",
  "exception": "exceptions",
  "try": "exceptions",
  "except": "exceptions",
  "error handling": "exceptions",
  "raise": "exceptions",
};

/**
 * Find the best matching doc topic for a concept string.
 * Returns undefined if no match is found.
 */
function matchConceptToTopic(concept: string): string | undefined {
  const lower = concept.toLowerCase().trim();

  if (CONCEPT_TO_TOPIC[lower]) {
    return CONCEPT_TO_TOPIC[lower];
  }

  for (const [key, topic] of Object.entries(CONCEPT_TO_TOPIC)) {
    if (lower.includes(key) || key.includes(lower)) {
      return topic;
    }
  }

  return undefined;
}


/**
 * Fetch doc references for a list of concepts identified by Gemini.
 * Only fetches for concepts that map to known doc topics.
 * Deduplicates topics so we don't fetch the same page twice.
 */
export async function enrichWithDocs(
  concepts: string[],
  languageId?: string
): Promise<DocReference[]> {
  // Only support Python docs for now
  if (languageId && languageId !== "python") {
    return [];
  }

  // Map concepts to unique topics
  const topicMap = new Map<string, string[]>();
  for (const concept of concepts) {
    const topic = matchConceptToTopic(concept);
    if (topic) {
      const existing = topicMap.get(topic) ?? [];
      existing.push(concept);
      topicMap.set(topic, existing);
    }
  }

  if (topicMap.size === 0) {
    return [];
  }

  const refs: DocReference[] = [];

  // Fetch docs for each unique topic in parallel
  const entries = Array.from(topicMap.entries());
  const results = await Promise.allSettled(
    entries.map(([topic]) => getPythonDocs(topic))
  );

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const [, conceptNames] = entries[i];

    if (result.status !== "fulfilled") {
      continue;
    }

    const docsResult = result.value;
    const firstSection = docsResult.sections[0];
    if (!firstSection || firstSection.paragraphs.length === 0) {
      continue;
    }

    // Pick the best quote — first paragraph of the relevant section
    const quote = firstSection.paragraphs[0];

    // Create a ref for each concept that mapped to this topic
    for (const concept of conceptNames) {
      refs.push({
        concept,
        quote,
        source: docsResult.source,
        url: docsResult.url,
      });
    }
  }

  return refs;
}
