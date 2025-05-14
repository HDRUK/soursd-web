import { ResponseJson, ResponseOptions } from "@/types/requests";
import { UsersResponse } from "../users";
declare const _default: (id: number, options: ResponseOptions) => Promise<ResponseJson<UsersResponse>>;
export default _default;
