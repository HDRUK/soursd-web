import {
  postProfessionalRegistration,
  putProfessionalRegistration,
} from "@/services/professional_registrations";
import {
  PostProfessionalRegistrationPayload,
  PutProfessionalRegistrationPayload,
} from "@/services/professional_registrations/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutationUpdateProfessionalRegistration(
  registryId: number
) {
  return useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (
      payload: PostProfessionalRegistrationPayload &
        PutProfessionalRegistrationPayload
    ) => {
      if (!payload?.id) {
        return postProfessionalRegistration(registryId, payload, {
          error: { message: "createProfessionalRegistrationError" },
        });
      }

      return putProfessionalRegistration(payload.id, payload, {
        error: { message: "updateProfessionalRegistrationError" },
      });
    },
  });
}
