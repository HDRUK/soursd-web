import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { PostCustodianUserPayload, PostCustodianUserResponse } from "./types";

export default async (
  payload: PostCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, options);

  if (error) {
    return Promise.reject(error);
  }

  return response.json();
};
