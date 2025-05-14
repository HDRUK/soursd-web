import { ResearcherProfessionalRegistration } from "@/types/application";
export default function putProfessionalRegistrationQuery(registryId: number): {
    mutationKey: (string | number)[];
    mutationFn: (payload: ResearcherProfessionalRegistration) => Promise<ResponseJson<ResearcherProfessionalRegistration>>;
};
