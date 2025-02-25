import getWebhookEventTrigger from "./getWebhookEventTrigger";

export default function getWebhookEventTriggerQuery() {
  return {
    queryKey: ["getWebhookEventTrigger"],
    queryFn: () =>
        getWebhookEventTrigger({
        error: {
            message: "getWebhookEventTriggerError",
        },
        }),
    };
}
