import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { UpdatePermissonsPayload, PatchUserResponse } from "./types";

export default async (
  payload: UpdatePermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/permissions`,
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
