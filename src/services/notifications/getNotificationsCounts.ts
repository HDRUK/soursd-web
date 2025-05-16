import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

type NotificationCountResponse = {
  total: number;
  read: number;
  unread: number;
};

export default async (
  userId: number,
  options: ResponseOptions
): Promise<ResponseJson<NotificationCountResponse>> => {
  const response = await getRequest(
    `/users/${userId}/notifications/count`,
    undefined
  );

  return handleJsonResponse(response, options);
};
