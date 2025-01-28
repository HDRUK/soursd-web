import getNotificationsCountsQuery from "@/services/notifications/getNotificationsCountsQuery";
import { useQuery } from "@tanstack/react-query";

const useGetNotificationsCount = (userId: number) =>
  useQuery(getNotificationsCountsQuery(userId));

export default useGetNotificationsCount;
