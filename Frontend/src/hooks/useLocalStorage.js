import { useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setAndPersist = useCallback(
    (next) => {
      setValue((previous) => {
        const resolved = typeof next === "function" ? next(previous) : next;

        try {
          if (resolved === null || resolved === undefined) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          }
        } catch (error) {
          console.error("Unable to persist localStorage value:", error);
        }

        return resolved;
      });
    },
    [key],
  );

  return [value, setAndPersist];
}
