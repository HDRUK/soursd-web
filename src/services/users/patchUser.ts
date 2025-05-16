import { ResponseJson, ResponseOptions } from "../../types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchUserPayload, PatchUserResponse } from "./types";

export default async (
  id: number,
  payload: PatchUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchUserResponse>> => {
  const response = await patchRequest(`/users/${id}`, payload);

  return handleJsonResponse(response, options);
};
