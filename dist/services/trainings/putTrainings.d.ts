import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutTrainingsPayload, PutTrainingsResponse } from "./types";
declare const _default: (id: number, payload: PutTrainingsPayload, options: ResponseOptions) => Promise<ResponseJson<PutTrainingsResponse>>;
export default _default;
