import React, { useEffect, useRef } from "react";
import { previewSource } from "./preview-source";

import "./preview.css";

interface PreviewProps {
  code: string;
  error?: string;
}

interface PostMessageArgs {
  ref: React.RefObject<HTMLIFrameElement>;
  type: "execute_code" | "bundle_error";
  data?: string;
}

function postMessage({ ref, type, data }: PostMessageArgs) {
  if (ref.current) ref.current.srcdoc = previewSource;

  return setTimeout(() => {
    const message = JSON.stringify({ type, data });
    if (ref.current?.contentWindow) {
      ref.current.contentWindow.postMessage(message, "*");
    }
  }, 50);
}

export const useMessage = ({ ref, type, data }: PostMessageArgs) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (data) {
      timer = postMessage({ ref, type, data });
    }
    return () => {
      clearTimeout(timer);
    };
  }, [ref, type, data]);
};

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useMessage({ ref: iframe, type: "execute_code", data: code });
  useMessage({ ref: iframe, type: "bundle_error", data: error });

  return (
    <div className="preview">
      <iframe
        className="preview__frame"
        srcDoc={previewSource}
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
