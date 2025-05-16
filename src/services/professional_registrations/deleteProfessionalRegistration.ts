import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { deleteRequest } from "../requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/professional_registrations/${id}`);

  return handleJsonResponse(response, options);
};
