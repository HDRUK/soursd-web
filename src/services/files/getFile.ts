import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { FileResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await getRequest(`/files/${id}`);

  return handleJsonResponse(response, options);
};
