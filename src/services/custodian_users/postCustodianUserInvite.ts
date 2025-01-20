import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { PostCustodianUserResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/invite/${id}`,
    undefined,
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
