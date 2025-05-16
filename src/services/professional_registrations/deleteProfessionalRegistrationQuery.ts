import { MutationOptions } from "../../types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProfessionalRegistration from "./deleteProfessionalRegistration";

export default function deleteProfessionalRegistrationQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "deleteProfessionalRegistration",
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: (id: number) => {
      return deleteProfessionalRegistration(id, {
        error: { message: "deleteProfessionalRegistration" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteProfessionalRegistration>>,
    Error,
    number
  >;
}
