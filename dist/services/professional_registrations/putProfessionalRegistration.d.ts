import { ResearcherProfessionalRegistration } from "@/types/application";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostProfessionalRegistrationPayload } from "./types";
declare const _default: (id: number, payload: PostProfessionalRegistrationPayload, options?: ResponseOptions) => Promise<ResponseJson<ResearcherProfessionalRegistration>>;
export default _default;
