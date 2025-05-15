import { PostProfessionalRegistrationPayload } from "./types";
export default function postProfessionalRegistrationQuery(registryId: number): {
    mutationKey: (string | number)[];
    mutationFn: (payload: PostProfessionalRegistrationPayload) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").ResearcherProfessionalRegistration>>;
};
