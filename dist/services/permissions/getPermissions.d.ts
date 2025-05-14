import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { PermissionsResponse } from "./types";
declare const _default: (options: ResponseOptions) => Promise<ResponseJson<Paged<PermissionsResponse>>>;
export default _default;
