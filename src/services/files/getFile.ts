import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { FileResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/files/${id}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
