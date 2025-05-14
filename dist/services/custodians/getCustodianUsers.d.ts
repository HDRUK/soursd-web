import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetCustodianUsersResponse } from "./types";
declare const _default: (custodianId: number, searchParams: SearchParams, options?: ResponseOptions) => Promise<ResponseJson<Paged<GetCustodianUsersResponse>>>;
export default _default;
