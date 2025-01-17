import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostCustodianUserResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/invite/${id}`
  );

  return handleJsonResponse(response, options);
};
