import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { FileResponse, FilePayload } from "./types";

export default async (
  payload: FilePayload,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/files`,
    payload
  );

  const error = handleResponseError(response, options);

  if (error) return Promise.reject(error);

  const data = await response.json();

  return data;
};
