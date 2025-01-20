import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { UserResponse } from "./types";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<UserResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${id}`
  );

  return handleJsonResponse(response, options);
};
