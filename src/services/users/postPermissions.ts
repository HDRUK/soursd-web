import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchUserResponse, UpdatePermissonsPayload } from "./types";

export default async (
  payload: UpdatePermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/permissions`,
    payload
  );

  return handleJsonResponse(response, options);
};
