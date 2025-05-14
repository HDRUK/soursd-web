import { Dispatch, SetStateAction } from "react";
declare const useDebounce: <T>(value: T, delay?: number, minLetters?: number) => [T, Dispatch<SetStateAction<T>>];
export default useDebounce;
