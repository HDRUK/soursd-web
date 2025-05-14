import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { SearchParams } from "@/types/query";
import { UserProjectsResponse } from "./types";
declare const _default: (id: string | number, searchParams: SearchParams, options?: ResponseOptions) => Promise<ResponseJson<Paged<UserProjectsResponse>>>;
export default _default;
