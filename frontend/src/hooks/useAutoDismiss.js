import { useEffect } from "react";

const useAutoDismiss = (value, setValue, delay = 5000) => {
  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => {
      setValue("");
    }, delay);

    return () => clearTimeout(timer);
  }, [value, setValue, delay]);
};

export default useAutoDismiss;