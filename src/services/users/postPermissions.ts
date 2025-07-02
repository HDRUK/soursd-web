import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutUserResponse, UpdatePermissonsPayload } from "./types";

export default async (
  payload: UpdatePermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutUserResponse>> => {
  const response = await postRequest(`/users/permissions`, payload);

  return handleJsonResponse(response, options);
};
