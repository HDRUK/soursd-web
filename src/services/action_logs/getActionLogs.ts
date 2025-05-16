import { ResponseJson, ResponseOptions } from "../../types/requests";
import { ActionLog, ActionLogEntity } from "../../types/logs";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  userId: number,
  entity: ActionLogEntity,
  options: ResponseOptions
): Promise<ResponseJson<ActionLog[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/${entity}s/${userId}/action_log`
  );

  return handleJsonResponse(response, options);
};
