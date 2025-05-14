import { ResponseJson, ResponseOptions } from "@/types/requests";
import { OrganisationResponse, PatchOrganisationPayload } from "./types";
declare const _default: (id: number, payload: PatchOrganisationPayload, options: ResponseOptions) => Promise<ResponseJson<OrganisationResponse>>;
export default _default;
