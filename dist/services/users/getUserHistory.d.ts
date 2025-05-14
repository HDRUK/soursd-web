import { ResponseJson, ResponseOptions } from "@/types/requests";
import { UserHistory } from "./types";
declare const _default: (id: string | number, options?: ResponseOptions) => Promise<ResponseJson<UserHistory[]>>;
export default _default;
