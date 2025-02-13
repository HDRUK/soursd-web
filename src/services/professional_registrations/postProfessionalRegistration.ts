import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse, handleResponseError } from "../requestHelpers";
import {
  PostProfessionalResgitrationResponse,
  PostProfessionalRegistrationPayload,
} from "./types";

export default async (
  registryId: number,
  payload: PostProfessionalRegistrationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProfessionalResgitrationResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/professional_registrations/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
