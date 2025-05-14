import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { UsersResponse } from "./types";
declare const _default: (searchParams: Record<string, string | number | undefined>, options?: ResponseOptions) => Promise<ResponseJson<Paged<UsersResponse>>>;
export default _default;
