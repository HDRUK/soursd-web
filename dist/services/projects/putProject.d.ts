import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutProjectPayload, PutProjectResponse } from "./types";
declare const _default: (id: number, payload: PutProjectPayload, options?: ResponseOptions) => Promise<ResponseJson<PutProjectResponse>>;
export default _default;
