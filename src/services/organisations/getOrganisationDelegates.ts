import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UsersResponse } from "../users";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<UsersResponse>> => {
  const response = await getRequest(
    `/organisations/${id}/delegates`,
    undefined
  );

  return handleJsonResponse(response, options);
};
