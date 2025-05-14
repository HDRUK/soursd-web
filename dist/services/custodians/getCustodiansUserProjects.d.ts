import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetCustodiansUserProjectsResponse } from "./types";
export default function getCustodiansUserProjects(custodianId: number, userId: number, searchParams: SearchParams, options?: ResponseOptions): Promise<ResponseJson<Paged<GetCustodiansUserProjectsResponse>>>;
