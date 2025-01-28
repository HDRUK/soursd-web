import patchUserNotification from "./patchUserNotification";
import { NotificationPatchType } from "./types";

export default function patchNotificationQuery(userId: number) {
  return {
    mutationKey: ["patchUserNotifications"],
    mutationFn: ({
      notificationId,
      type,
    }: {
      notificationId: string;
      type: NotificationPatchType;
    }) =>
      patchUserNotification(userId as number, notificationId, type, {
        suppressThrow: true,
        error: {
          message: "patchNotificationError",
        },
      }),
  };
}
