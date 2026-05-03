import { useEffect, useRef } from "react";

interface VSCodeApi {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
}

declare function acquireVsCodeApi(): VSCodeApi;

let vscodeApi: VSCodeApi | undefined;

function getVSCodeApi(): VSCodeApi {
  if (!vscodeApi) {
    vscodeApi = acquireVsCodeApi();
  }

  return vscodeApi;
}

export function useVSCodeApi(): VSCodeApi {
  const api = useRef(getVSCodeApi());

  useEffect(() => {
    api.current.postMessage({ type: "ready" });
  }, []);

  return api.current;
}
