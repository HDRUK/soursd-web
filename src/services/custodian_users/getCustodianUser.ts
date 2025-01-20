import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { GetCustodianUserResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianUserResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, options);

  if (error) return Promise.reject(error);

  return response.json();
};
