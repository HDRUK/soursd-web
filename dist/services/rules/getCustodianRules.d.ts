import { ResponseJson, ResponseOptions } from "@/types/requests";
import { Rules } from "./types";
declare const _default: (id: number | string, options: ResponseOptions) => Promise<ResponseJson<Rules[]>>;
export default _default;
