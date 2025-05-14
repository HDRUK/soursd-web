import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetAffiliationsResponse } from "./types";
declare const _default: (registryId: number, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<GetAffiliationsResponse>>>;
export default _default;
