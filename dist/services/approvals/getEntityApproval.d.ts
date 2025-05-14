import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
declare const _default: (entityType: EntityType, id: string | number, custodianId: string | number, options: ResponseOptions) => Promise<ResponseJson<boolean>>;
export default _default;
