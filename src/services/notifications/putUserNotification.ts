import { ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { NotificationPutType } from "./types";

export default async (
  userId: number,
  notificationId: string,
  type: NotificationPutType,
  options: ResponseOptions
) => {
  const response = await putRequest(
    `/users/${userId}/notifications/${notificationId}/${type}`,
    {}
  );

  return handleJsonResponse(response, options);
};
