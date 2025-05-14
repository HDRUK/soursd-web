import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostCustodianProjectPayload, PostCustodianProjectResponse } from "./types";
declare const _default: (custodianId: number, payload: PostCustodianProjectPayload, options?: ResponseOptions) => Promise<ResponseJson<PostCustodianProjectResponse>>;
export default _default;
