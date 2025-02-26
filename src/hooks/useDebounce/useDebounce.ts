import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { SEARCH_CHAR_LIMIT } from "@/consts/search";

const useDebounce = <T>(
  value: T,
  delay: number = 500,
  minLetters: number = SEARCH_CHAR_LIMIT
): [T, Dispatch<SetStateAction<T>>] => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (
      typeof value === "string" &&
      minLetters !== undefined &&
      value.length < minLetters &&
      value.length > 0
    ) {
      return undefined;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLetters]);

  return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
