import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationLog } from "@/types/logs";
declare const _default: (custodianId: number, organisationId: number, options: ResponseOptions) => Promise<ResponseJson<ValidationLog[]>>;
export default _default;
