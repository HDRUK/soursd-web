import { QueryOptions } from "../../types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getSectors from "./getSectors";

export default function getSectorsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSectors", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getSectors({
        error: {
          message: "getSectorsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getSectors>>>;
}
