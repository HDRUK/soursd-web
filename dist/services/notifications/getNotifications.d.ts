import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { Notification } from "@/types/notifications";
declare const _default: (userId: number, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<Notification[]>>>;
export default _default;
