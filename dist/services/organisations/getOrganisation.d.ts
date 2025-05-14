import { ResponseJson, ResponseOptions } from "@/types/requests";
import { OrganisationResponse } from "./types";
declare const _default: (id: string | number, options: ResponseOptions) => Promise<ResponseJson<OrganisationResponse>>;
export default _default;
