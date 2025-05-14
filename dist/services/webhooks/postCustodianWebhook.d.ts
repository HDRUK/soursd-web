import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostCustodianWebhookPayload, Webhook } from "./types";
declare const _default: (payload: PostCustodianWebhookPayload, options: ResponseOptions) => Promise<ResponseJson<Webhook>>;
export default _default;
