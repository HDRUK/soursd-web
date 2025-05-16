import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import {
  PostCustodianProjectPayload,
  PostCustodianProjectResponse,
} from "./types";

export default async (
  custodianId: number,
  payload: PostCustodianProjectPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianProjectResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${custodianId}/projects`,
    payload
  );

  return handleJsonResponse(response, options);
};
