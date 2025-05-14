import { ResponseJson, ResponseOptions } from "@/types/requests";
import { WebhookEventTriggers } from "./types";
declare const _default: (options?: ResponseOptions) => Promise<ResponseJson<WebhookEventTriggers[]>>;
export default _default;
