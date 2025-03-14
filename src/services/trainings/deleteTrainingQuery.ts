import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteTraining from "./deleteTraining";

export default function deleteProfessionalRegistrationQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: ["deleteTraining", ...(options?.mutationKeySuffix || [])],
    mutationFn: (id: number) => {
      return deleteTraining(id, {
        error: { message: "deleteTrainingError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteTraining>>,
    Error,
    number
  >;
}
