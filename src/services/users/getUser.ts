import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { UserResponse } from "./types";

export default async (
  id: string | number,
  messages?: ResponseTranslations
): Promise<ResponseJson<UserResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  console.log("response", response);

  return handleJsonResponse(response, messages);
};
