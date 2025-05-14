import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutAffiliationsResponse, AffiliationStatus } from "./types";
declare const _default: (registryId: number, affiliationId: number, status: AffiliationStatus, options?: ResponseOptions) => Promise<ResponseJson<PutAffiliationsResponse>>;
export default _default;
