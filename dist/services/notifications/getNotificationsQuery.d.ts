export default function getNotificationsQuery(userId: number): {
    queryKey: (string | number)[];
    queryFn: ({ pageParam }: {
        pageParam: any;
    }) => Promise<ResponseJson<Paged<Notification[]>>>;
    initialPageParam: number;
    getNextPageParam: (lastPage: any) => any;
};
