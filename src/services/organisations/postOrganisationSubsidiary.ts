import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  PostSubsidiaryResponse,
  PostOrganisationSubsidiaryPayload,
} from "./types";

export default async (
  id: number,
  payload: PostOrganisationSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostSubsidiaryResponse>> => {
  const response = await postRequest(
    `/organisations/${id}/subsidiaries`,
    payload
  );

  return handleJsonResponse(response, options);
};
