import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { UsersResponse } from "../users";
declare const _default: (id: number, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<UsersResponse>>>;
export default _default;
