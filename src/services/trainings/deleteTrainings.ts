import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { deleteRequest } from "../requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/training/${id}`
  );

  return handleJsonResponse(response, options);
};
