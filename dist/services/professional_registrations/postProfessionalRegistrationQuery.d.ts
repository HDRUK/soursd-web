import { PostProfessionalRegistrationPayload } from "./types";
export default function postProfessionalRegistrationQuery(registryId: number): {
    mutationKey: (string | number)[];
    mutationFn: (payload: PostProfessionalRegistrationPayload) => Promise<ResponseJson<ResearcherProfessionalRegistration>>;
};
