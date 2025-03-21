import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import {
  PostProfessionalRegistrationPayload,
  PostProfessionalResgitrationResponse,
} from "./types";

export default async (
  registryId: number,
  payload: PostProfessionalRegistrationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProfessionalResgitrationResponse>> => {
  const response = await postRequest(
    `/professional_registrations/registry/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
