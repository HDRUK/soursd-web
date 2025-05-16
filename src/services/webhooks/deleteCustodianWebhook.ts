import { ResponseJson, ResponseOptions } from "../../types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  payload: { id: number },
  custodianId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/webhooks/receivers/${custodianId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
