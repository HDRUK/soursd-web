declare const useGetNotificationsCount: (userId: number) => import("@tanstack/react-query").UseQueryResult<import("../../../types/requests").ResponseJson<{
    total: number;
    read: number;
    unread: number;
}>, Error>;
export default useGetNotificationsCount;
