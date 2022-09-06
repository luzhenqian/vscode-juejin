import { RequestConfig } from "../types";

declare const window: any;

export function request<T>(config: RequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    const { type, payload } = config;
    window.vscode.postMessage({
      type,
      payload,
    });

    const timer = setTimeout(() => {
      reject(new Error("Request timeout"));
    }, request.config.timeout);

    let cb = ({ data }: { data: any }) => {
      if (data.type === type) {
        resolve(data.payload);
        clearEffect();
      }
    };

    window.addEventListener("message", cb);
    const clearEffect = () => {
      window.removeEventListener("message", cb);
      clearTimeout(timer);
    };
  });
}

request.config = {
  timeout: 10_000,
};
