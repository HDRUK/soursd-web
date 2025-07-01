import { ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { NotificationPutType } from "./types";

export default async (
  userId: number,
  notificationId: string,
  type: NotificationPutType,
  options: ResponseOptions
) => {
  const response = await patchRequest(
    `/users/${userId}/notifications/${notificationId}/${type}`,
    {}
  );

  return handleJsonResponse(response, options);
};
