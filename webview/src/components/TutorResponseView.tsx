import type { TutorResponse } from "../App";

interface VSCodeApi {
  postMessage(message: unknown): void;
}

interface TutorResponseViewProps {
  data: TutorResponse;
  vscodeApi: VSCodeApi;
}

export function TutorResponseView({ data, vscodeApi }: TutorResponseViewProps) {
  const firstQuiz = data.quiz[0];

  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <div className="text-xs uppercase tracking-wide text-vybe-subtle">
          {data.mode === "mock" ? "Mock tutor response" : "Gemini tutor response"}
        </div>
        <h1 className="text-lg font-semibold leading-snug text-vybe-text">
          {data.title}
        </h1>
        <p className="text-sm leading-relaxed text-vybe-text">
          {data.explanation}
        </p>
        <div className="flex flex-wrap gap-2">
          {data.keyConcepts.map((concept) => (
            <span
              key={concept}
              className="rounded border border-vybe-border bg-vybe-chip px-2 py-1 text-xs text-vybe-amber"
            >
              {concept}
            </span>
          ))}
        </div>
      </section>

      {firstQuiz && (
        <section className="space-y-3 border-t border-vybe-border pt-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-vybe-subtle">
            QUICK CHECK +10 XP
          </div>
          <p className="text-sm leading-relaxed text-vybe-text">
            {firstQuiz.question}
          </p>
          <div className="space-y-2">
            {firstQuiz.options.map((option) => (
              <button
                key={option.id}
                className="w-full rounded border border-vybe-border bg-vybe-raised px-3 py-2 text-left text-sm text-vybe-text transition hover:border-vybe-amber focus:outline-none focus:ring-2 focus:ring-vybe-amber"
                type="button"
                onClick={() => {
                  console.log("Clicked option", option.id);
                  vscodeApi.postMessage({
                    type: "submitQuizAnswer",
                    payload: {
                      questionId: firstQuiz.id,
                      selectedOptionId: option.id,
                    },
                  });
                }}
              >
                <span className="mr-2 text-vybe-amber">
                  {option.id.toUpperCase()}.
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
