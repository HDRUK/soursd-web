import { ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { NotificationPatchType } from "./types";

export default async (
  userId: number,
  notificationId: string,
  type: NotificationPatchType,
  options: ResponseOptions
) => {
  const response = await patchRequest(
    `/users/${userId}/notifications/${notificationId}/${type}`,
    {}
  );

  return handleJsonResponse(response, options);
};
