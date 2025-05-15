import { PostCustodianWebhookPayload } from "./types";
export default function postCustodianWebhookQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostCustodianWebhookPayload) => Promise<import("../../types/requests").ResponseJson<import("./types").Webhook>>;
};
