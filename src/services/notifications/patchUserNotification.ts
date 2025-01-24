import { ResponseOptions } from "@/types/requests";
import { handleJsonResponse, patchRequest } from "../requests";

export enum NotificationPatchType {
  READ = "read",
  UNREAD = "unread",
}

export default async (
  userId: number,
  notificationId: string,
  type: NotificationPatchType,
  options: ResponseOptions
) => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${userId}/notifications/${notificationId}/${type}`,
    {}
  );

  return handleJsonResponse(response, options);
};
