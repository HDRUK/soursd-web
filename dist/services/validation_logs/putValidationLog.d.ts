import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationLog } from "@/types/logs";
import { ValidationLogAction } from "./types";
declare const _default: (logId: number, action: ValidationLogAction, options?: ResponseOptions) => Promise<ResponseJson<ValidationLog>>;
export default _default;
