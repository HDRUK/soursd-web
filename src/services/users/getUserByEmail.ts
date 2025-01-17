import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { UserResponse } from "./types";

export default async (
  email: string,
  options?: ResponseOptions
): Promise<ResponseJson<UserResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/email/${email}`
  );

  return handleJsonResponse(response, options);
};
