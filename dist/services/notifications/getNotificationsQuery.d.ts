export default function getNotificationsQuery(userId: number): {
    queryKey: (string | number)[];
    queryFn: ({ pageParam }: {
        pageParam: any;
    }) => Promise<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<import("../../types/notifications").Notification[]>>>;
    initialPageParam: number;
    getNextPageParam: (lastPage: any) => any;
};
