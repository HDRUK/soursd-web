import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PatchCustodianUserPayload, PatchCustodianUserResponse } from "./types";
declare const _default: (userId: number, payload: PatchCustodianUserPayload, options: ResponseOptions) => Promise<ResponseJson<PatchCustodianUserResponse>>;
export default _default;
