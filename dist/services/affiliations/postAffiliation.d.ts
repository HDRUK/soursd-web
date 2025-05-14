import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostAffiliationPayload, PostAffiliationsResponse } from "./types";
declare const _default: (registryId: number, payload: PostAffiliationPayload, options?: ResponseOptions) => Promise<ResponseJson<PostAffiliationsResponse>>;
export default _default;
