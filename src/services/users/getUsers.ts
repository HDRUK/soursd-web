import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { UsersResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users`
  );

  return handleJsonResponse(response, options);
};
