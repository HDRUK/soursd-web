import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PatchCustodianPayload, PatchCustodianResponse } from "./types";
declare const _default: (id: number, payload: PatchCustodianPayload, options: ResponseOptions) => Promise<ResponseJson<PatchCustodianResponse>>;
export default _default;
