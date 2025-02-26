import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchUserPayload, PatchUserResponse } from "./types";

export default async (
  id: number,
  payload: PatchUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchUserResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
