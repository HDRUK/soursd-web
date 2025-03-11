import { ResearcherProfessionalRegistration } from "@/types/application";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PostProfessionalRegistrationPayload } from "./types";

export default async (
  id: number,
  payload: PostProfessionalRegistrationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<ResearcherProfessionalRegistration>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/professional_registrations/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
