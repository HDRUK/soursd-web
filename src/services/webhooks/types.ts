interface Webhook {
  id: number;
  created_at: string;
  updated_at: string;
  custodian_id: number;
  url: string;
  webhook_event: number;
  event_trigger: EventTrigger;
}

interface EventTrigger {
  id: number;
  name: string;
  description: string;
}

interface PostCustodianWebhookPayload {
  custodian_id: number;
  url: string;
  webhook_event_id: number;
}

interface WebhookEventTriggers extends EventTrigger {
  enabled: boolean;
}

export type {
  EventTrigger,
  PostCustodianWebhookPayload,
  Webhook,
  WebhookEventTriggers,
};
