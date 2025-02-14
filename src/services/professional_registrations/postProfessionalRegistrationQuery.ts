import postProfessionalRegistration from "./postProfessionalRegistration";
import { PostProfessionalRegistrationPayload } from "./types";

export default function postProfessionalRegistrationQuery(registryId: number) {
  return {
    mutationKey: ["postProfessionalRegistration", registryId],
    mutationFn: (payload: PostProfessionalRegistrationPayload) => {
      return postProfessionalRegistration(registryId, payload, {
        error: { message: "postProfessionalRegistrationError" },
      });
    },
  };
}
