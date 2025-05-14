import { ResponseJson, ResponseOptions } from "@/types/requests";
import { UserResponse } from "./types";
declare const _default: (id: string | number, options?: ResponseOptions) => Promise<ResponseJson<UserResponse>>;
export default _default;
