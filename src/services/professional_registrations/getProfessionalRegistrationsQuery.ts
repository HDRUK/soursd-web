import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProfessionalRegistrations from "./getProfessionalRegistrations";

export default function getProfessionalRegistrationsQuery(
  registry_id: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getProfessionalRegistrations", registry_id],
    queryFn: ({ queryKey }) =>
      getProfessionalRegistrations(queryKey[1] as number, {
        error: {
          message: "getProfessionalRegistrationsError",
          ...options?.error,
        },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getProfessionalRegistrations>>;
}
