import { useEffect, useState } from "react";
import { SEARCH_CHAR_LIMIT } from "@/consts/search";

const useDebounce = (
  value: string,
  delay = 500,
  minLetters = SEARCH_CHAR_LIMIT
) => {
  const [debouncedValue, setDebouncedValue] = useState(value || "");

  useEffect(() => {
    if (value.length < minLetters && value.length > 0) return undefined;

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLetters]);

  return debouncedValue;
};

export default useDebounce;
