import { NotificationPatchType } from "./types";
export default function patchNotificationQuery(userId: number): {
    mutationKey: string[];
    mutationFn: ({ notificationId, type, }: {
        notificationId: string;
        type: NotificationPatchType;
    }) => Promise<any>;
};
