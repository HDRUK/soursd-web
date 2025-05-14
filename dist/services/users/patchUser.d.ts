import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PatchUserPayload, PatchUserResponse } from "./types";
declare const _default: (id: number, payload: PatchUserPayload, options: ResponseOptions) => Promise<ResponseJson<PatchUserResponse>>;
export default _default;
