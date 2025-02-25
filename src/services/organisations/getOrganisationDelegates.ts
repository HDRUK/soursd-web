import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UsersResponse } from "../users";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<UsersResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}/delegates`,
    undefined
  );

  return handleJsonResponse(response, options);
};
