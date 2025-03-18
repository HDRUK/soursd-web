import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { Notification } from "@/types/notifications";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  userId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<Notification[]>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const response = await getRequest(
    `/users/${userId}/notifications?${params.toString()}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
