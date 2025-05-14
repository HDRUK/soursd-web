import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutProjectUsersPayload, PostProjectUsersResponse } from "./types";
declare const _default: (id: number, payload: PutProjectUsersPayload, options?: ResponseOptions) => Promise<ResponseJson<PostProjectUsersResponse>>;
export default _default;
