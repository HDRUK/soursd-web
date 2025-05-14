import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutUserPayload, PutUserResponse } from "./types";
declare const _default: (id: number, payload: PutUserPayload, options: ResponseOptions) => Promise<ResponseJson<PutUserResponse>>;
export default _default;
