import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { OrganisationResponse, PatchOrganisationPayload } from "./types";

export default async (
  id: number,
  payload: PatchOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
