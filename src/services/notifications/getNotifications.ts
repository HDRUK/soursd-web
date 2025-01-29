import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { Notification } from "@/types/notifications";
import { getRequest, handleJsonResponse } from "../requests";

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
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${userId}/notifications?${params.toString()}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
