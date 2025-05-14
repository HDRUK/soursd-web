export default function getWebhookEventTriggerQuery(): {
    queryKey: string[];
    queryFn: () => Promise<ResponseJson<import("./types").WebhookEventTriggers[]>>;
};
