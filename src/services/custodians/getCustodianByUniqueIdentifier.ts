import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { GetCustodianResponse } from "./types";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/identifier/${id}`,
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
