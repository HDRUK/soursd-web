import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostProjectDetailsFromGatewayPayload, PostProjectDetailsFromGatewayResponse } from "./types";

export default async (
  payload: PostProjectDetailsFromGatewayPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectDetailsFromGatewayResponse>> => {
  const response = await postRequest(
    `/project_details/query_gateway_dur`, 
    payload
  );

  return handleJsonResponse(response, options);
};
