import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { deleteRequest, handleResponseError } from "../requests";
import { GetCustodiansUsersResponse } from "./types";

export default async (
  id: number,
  messages?: ResponseTranslations
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.json();
};
