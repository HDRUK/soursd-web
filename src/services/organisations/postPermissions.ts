import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
} from "./types";

export default async (
  payload: UpdateOrganisationPermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<UpdateOrganisationPermissionsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/permissions`,
    payload
  );

  return handleJsonResponse(response, options);
};
