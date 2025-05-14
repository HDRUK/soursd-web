import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ActionLog, ActionLogEntity } from "@/types/logs";
declare const _default: (userId: number, entity: ActionLogEntity, options: ResponseOptions) => Promise<ResponseJson<ActionLog[]>>;
export default _default;
