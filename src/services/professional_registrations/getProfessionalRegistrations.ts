import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetProfessionalRegistrationsResponse } from "./types";

export default async (
  registry_id: number,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetProfessionalRegistrationsResponse>>> => {
  const response = await getRequest(
    `/professional_registrations/registry/${registry_id}`
  );

  return handleJsonResponse(response, options);
};
