import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ActionLog } from "@/types/logs";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  userId: number,
  options: ResponseOptions
): Promise<ResponseJson<ActionLog[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${userId}/action_log`
  );

  return handleJsonResponse(response, options);
};
