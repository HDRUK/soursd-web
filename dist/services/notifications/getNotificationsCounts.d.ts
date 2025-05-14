import { ResponseJson, ResponseOptions } from "@/types/requests";
type NotificationCountResponse = {
    total: number;
    read: number;
    unread: number;
};
declare const _default: (userId: number, options: ResponseOptions) => Promise<ResponseJson<NotificationCountResponse>>;
export default _default;
