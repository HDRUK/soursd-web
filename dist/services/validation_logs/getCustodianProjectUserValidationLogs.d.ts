import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationLog } from "@/types/logs";
declare const _default: (custodianId: number, projectId: number, registryId: number, options: ResponseOptions) => Promise<ResponseJson<ValidationLog[]>>;
export default _default;
