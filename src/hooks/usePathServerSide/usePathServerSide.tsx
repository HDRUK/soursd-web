import { headers } from "next/headers";

export function usePathServerSide(): string | null {
  const head = headers();
  return head.get("x-current-path");
}
