import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostProfessionalRegistrationPayload, PostProfessionalResgitrationResponse } from "./types";
declare const _default: (registryId: number, payload: PostProfessionalRegistrationPayload, options?: ResponseOptions) => Promise<ResponseJson<PostProfessionalResgitrationResponse>>;
export default _default;
