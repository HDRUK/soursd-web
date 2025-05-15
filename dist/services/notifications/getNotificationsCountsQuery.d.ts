export default function getNotificationsCountsQuery(userId: number): {
    queryKey: (string | number)[];
    queryFn: ({ queryKey }: {
        queryKey: any;
    }) => Promise<import("../../types/requests").ResponseJson<{
        total: number;
        read: number;
        unread: number;
    }>>;
    enabled: boolean;
    refetchInterval: number;
};
