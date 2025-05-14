import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostEmploymentsPayload, PostEmploymentsResponse } from "./types";
declare const _default: (registryId: number, payload: PostEmploymentsPayload, options: ResponseOptions) => Promise<ResponseJson<PostEmploymentsResponse>>;
export default _default;
