import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getSystemConfig from "./getSystemConfig";

export default function getSystemConfigQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSystemConfig"],
    queryFn: () =>
      getSystemConfig({
        error: {
          message: "getSystemConfigError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getSystemConfig>>;
}
