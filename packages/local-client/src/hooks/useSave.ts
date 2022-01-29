import { useRef, useEffect } from "react";

type SaveCallback = () => any;

const useSave = (callback: SaveCallback) => {
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    if (!callbackRef.current) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.match(/s$/i)) {
        event.preventDefault();
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [callbackRef]);
};

export default useSave;
