import { ResponseJson, ResponseOptions } from "../../types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/affiliations/${id}`);

  return handleJsonResponse(response, options);
};
