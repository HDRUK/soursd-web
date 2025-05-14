import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetCustodianOrganisationsResponse } from "./types";
export default function getCustodianOrganisations(custodianId: number, searchParams: SearchParams, options?: ResponseOptions): Promise<ResponseJson<Paged<GetCustodianOrganisationsResponse>>>;
