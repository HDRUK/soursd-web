import { headers } from "next/headers";

export async function getCurrentPathServer(): string | null {
  const head = await headers();
  return head.get("x-current-path");
}
