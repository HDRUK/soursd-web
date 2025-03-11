import { ResearcherProfessionalRegistration } from "@/types/application";
import putProfessionalRegistration from "./putProfessionalRegistration";

export default function putProfessionalRegistrationQuery(registryId: number) {
  return {
    mutationKey: ["putProfessionalRegistration", registryId],
    mutationFn: (payload: ResearcherProfessionalRegistration) => {
      return putProfessionalRegistration(payload.id, payload, {
        error: { message: "putProfessionalRegistrationError" },
      });
    },
  };
}
