import React, { useEffect, useRef } from "react";

export const useOutsideClick = (
  ref: React.RefObject<any>,
  callback: () => void
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      callback();
    };
    document.addEventListener("click", listener, { capture: true });
    isMounted.current = true;

    return () => {
      document.addEventListener("click", listener, { capture: true });
    };
  });
};
