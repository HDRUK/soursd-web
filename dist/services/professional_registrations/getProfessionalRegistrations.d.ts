import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetProfessionalRegistrationsResponse } from "./types";
declare const _default: (registry_id: number, options?: ResponseOptions) => Promise<ResponseJson<Paged<GetProfessionalRegistrationsResponse>>>;
export default _default;
