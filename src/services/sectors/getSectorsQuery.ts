import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
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
