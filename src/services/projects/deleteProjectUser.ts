import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { deleteRequest } from "../requests";

export default async (
  projectId: number,
  registryId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users/${registryId}`
  );

  return handleJsonResponse(response, options);
};
