import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostTrainingsPayload, PostTrainingsResponse } from "./types";
declare const _default: (id: number, payload: PostTrainingsPayload, options?: ResponseOptions) => Promise<ResponseJson<PostTrainingsResponse>>;
export default _default;
