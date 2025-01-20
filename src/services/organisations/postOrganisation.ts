import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostOrganisationPayload, PostOrganisationResponse } from "./types";

export default async (
  payload: PostOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostOrganisationResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`,
    payload
  );

  return handleJsonResponse(response, options);
};
