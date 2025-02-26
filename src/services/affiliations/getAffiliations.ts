import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetAffiliationsResponse } from "./types";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  resgitryId: number,
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetAffiliationsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/affiliations/${resgitryId}`
  );

  return handleJsonResponse(response, options);
};
