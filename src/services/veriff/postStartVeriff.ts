import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostStartVeriffPayload } from "./types";

export default async (
  payload?: PostStartVeriffPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostStartVeriffPayload>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_LOCAL_ENV}/api/veriff/start`,
    payload
  );

  return handleJsonResponse(response, options);
};
