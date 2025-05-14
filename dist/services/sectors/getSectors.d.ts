import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { SectorsResponse } from "./types";
declare const _default: (options: ResponseOptions) => Promise<ResponseJson<Paged<SectorsResponse>>>;
export default _default;
