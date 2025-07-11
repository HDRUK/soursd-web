import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UsersResponse } from "../users";

export default async (
  id: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const response = await getRequest(
    `/organisations/${id}/registries${getSearchQuerystring(searchParams)}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
