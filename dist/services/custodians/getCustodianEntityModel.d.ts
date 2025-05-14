import { ResponseJson, ResponseOptions } from "@/types/requests";
import { EntityType, GetCustodianEntityModelResponse } from "./types";
declare const _default: (id: number, entity_type: EntityType, options: ResponseOptions) => Promise<ResponseJson<GetCustodianEntityModelResponse[]>>;
export default _default;
