import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, patchRequest } from "../requests";
import { OrganisationResponse, PatchOrganisationPayload } from "./types";

export default async (
  id: number,
  payload: PatchOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, options);
};
