declare const useGetNotifcations: (userId: number) => import("@tanstack/react-query").UseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<import("../../../types/requests").ResponseJson<import("../../../types/requests").Paged<import("../../../types/notifications").Notification[]>>, unknown>, Error>;
export default useGetNotifcations;
