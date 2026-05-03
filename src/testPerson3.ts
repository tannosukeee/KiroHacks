import { getTutorResponse } from "./ai/geminiService";

async function run() {
  const res = await getTutorResponse({
    context: {} as any, // fake VS Code context
    selectedCode: `
function multiply(a, b) {
  return a * b;
}
    `,
    languageId: "javascript",
    useMock: true,
  });

  console.log("\n=== Tutor Response ===");
  console.log("Title:", res.title);
  console.log("Explanation:", res.explanation);
  console.log("Concepts:", res.keyConcepts);
  console.log("Quiz count:", res.quiz.length);
  console.log("First question:", res.quiz[0].question);
}

run();