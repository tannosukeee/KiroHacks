import { useEffect, useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { HeaderBar } from "./components/HeaderBar";
import { TutorResponseView } from "./components/TutorResponseView";
import { useVSCodeApi } from "./hooks/useVSCodeApi";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface TutorResponse {
  mode: "mock" | "gemini";
  title: string;
  explanation: string;
  keyConcepts: string[];
  quiz: QuizQuestion[];
  guardrail: {
    blocked: boolean;
    reason?: string;
  };
}

type ViewState =
  | { status: "empty" }
  | { status: "loading"; response?: TutorResponse }
  | { status: "ready"; response: TutorResponse }
  | { status: "error"; message: string };

export function App() {
  const vscodeApi = useVSCodeApi();
  const [viewState, setViewState] = useState<ViewState>({ status: "empty" });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.type === "loading" && message.payload.isLoading) {
        setViewState((current) => ({
          status: "loading",
          response:
            current.status === "ready" || current.status === "loading"
              ? current.response
              : undefined,
        }));
      }

      if (message.type === "tutorResponse") {
        setViewState({ status: "ready", response: message.payload });
      }

      if (message.type === "error") {
        setViewState({ status: "error", message: message.payload.message });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-vybe-bg text-vybe-text font-mono">
      <HeaderBar mode={viewState.status === "ready" ? "LIVE" : "IDLE"} />
      <main className="p-4">
        {viewState.status === "empty" && <EmptyState />}
        {viewState.status === "error" && (
          <div className="rounded border border-vybe-border bg-vybe-raised p-4 text-sm text-vybe-muted">
            {viewState.message}
          </div>
        )}
        {viewState.status === "loading" && !viewState.response && (
          <div className="rounded border border-vybe-border bg-vybe-raised p-4 text-sm text-vybe-muted">
            Building explanation...
          </div>
        )}
        {viewState.status === "loading" && viewState.response && (
          <TutorResponseView data={viewState.response} vscodeApi={vscodeApi} />
        )}
        {viewState.status === "ready" && (
          <TutorResponseView data={viewState.response} vscodeApi={vscodeApi} />
        )}
      </main>
    </div>
  );
}
