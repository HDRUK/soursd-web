import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { PermissionsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<PermissionsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/permissions`,
    undefined
  );

  return handleJsonResponse(response, options);
};
