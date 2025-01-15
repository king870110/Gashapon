import { useState, useCallback } from "react";

const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const debounce = useCallback(
    (...args) => {
      if (timeoutId) clearTimeout(timeoutId);

      const id = setTimeout(() => callback(...args), delay);
      setTimeoutId(id);
    },
    [timeoutId, callback, delay]
  );

  return debounce;
};

export default useDebounce;
