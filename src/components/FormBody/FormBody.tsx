import { ReactNode } from "react";

interface FormBodyProps {
  children: ReactNode;
}

export default function FormBody({ children }: FormBodyProps) {
  return children;
}
