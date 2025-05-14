import { ResponseJson, ResponseOptions } from "@/types/requests";
import { Webhook } from "./types";
declare const _default: (custodianId: number, options?: ResponseOptions) => Promise<ResponseJson<Webhook[]>>;
export default _default;
