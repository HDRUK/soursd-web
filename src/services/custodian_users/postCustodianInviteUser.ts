import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";

export default async (
  id: number,
  messages?: ResponseTranslations
): Promise<ResponseJson<null>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/invite/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
