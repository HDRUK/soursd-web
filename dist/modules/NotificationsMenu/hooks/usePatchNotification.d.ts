declare const usePatchNotification: (userId: number) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    notificationId: string;
    type: import("../../../services/notifications/types").NotificationPatchType;
}, unknown>;
export default usePatchNotification;
