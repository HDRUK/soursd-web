import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest, handleJsonResponse } from "../requests";
import { UsersResponse } from "../users";

export default async (
  organisationId: number,
  registryId: number,
  options: ResponseOptions
): Promise<ResponseJson<UsersResponse>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${organisationId}/users/${registryId}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
