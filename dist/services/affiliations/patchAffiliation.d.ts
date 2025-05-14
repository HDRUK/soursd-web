import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PatchAffiliationsPayload, PatchAffiliationsResponse } from "./types";
declare const _default: (affiliationId: number, payload: PatchAffiliationsPayload, options?: ResponseOptions) => Promise<ResponseJson<PatchAffiliationsResponse>>;
export default _default;
