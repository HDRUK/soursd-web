import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { OrganisationsResponse } from "./types";
declare const _default: (searchParams: SearchParams, options?: ResponseOptions) => Promise<ResponseJson<Paged<OrganisationsResponse>>>;
export default _default;
