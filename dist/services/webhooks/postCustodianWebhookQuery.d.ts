import { PostCustodianWebhookPayload } from "./types";
export default function postCustodianWebhookQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostCustodianWebhookPayload) => Promise<ResponseJson<import("./types").Webhook>>;
};
