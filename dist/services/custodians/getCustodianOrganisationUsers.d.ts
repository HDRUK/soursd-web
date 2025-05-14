import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { SearchParams } from "@/types/query";
import { GetCustodianProjectUserResponse } from "./types";
export type ProjectEntities = "organisation" | "custodian" | "user";
declare const _default: (custodianId: number, organisationId: number, searchParams: SearchParams, options?: ResponseOptions) => Promise<ResponseJson<Paged<GetCustodianProjectUserResponse>>>;
export default _default;
