import { useEffect, useState } from "react";

export const useDebounce = (v: string = "", delay: number = 500) => {
  const [value, setValue] = useState(v);
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(v);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [v,delay]);

  return value;
};
