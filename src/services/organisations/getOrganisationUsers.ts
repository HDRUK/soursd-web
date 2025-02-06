import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UsersResponse } from "../users";

export default async (
  id: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}/users?${params.toString()}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
