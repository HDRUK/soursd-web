import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getSectors from "./getSectors";

export default function getSectorsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSectors"],
    queryFn: () =>
      getSectors({
        error: {
          message: "getSectorsError",
          ...options?.error,
        },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getSectors>>;
}
