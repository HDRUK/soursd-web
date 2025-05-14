import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { AccreditationsResponse } from "./types";
declare const _default: (resgitryId: number, options: ResponseOptions) => Promise<ResponseJson<Paged<AccreditationsResponse>>>;
export default _default;
