import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { deleteRequest } from "../requests";

export default async (
  projectId: number,
  userDigitalIdent: string,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  console.log("***** projectId", projectId);
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users/${userDigitalIdent}`
  );

  return handleJsonResponse(response, options);
};
