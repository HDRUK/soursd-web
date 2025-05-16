import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleResponseError } from "../requestHelpers";
import { FileResponse, FilePayload } from "./types";

export default async (
  payload: FilePayload,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await postRequest(`/files`, payload);

  const error = handleResponseError(response, options);

  if (error) return Promise.reject(error);

  const data = await response.json();

  return data;
};
