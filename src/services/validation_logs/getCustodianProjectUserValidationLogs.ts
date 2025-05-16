import { ResponseJson, ResponseOptions } from "../../types/requests";
import { ValidationLog } from "../../types/logs";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  custodianId: number,
  projectId: number,
  registryId: number,
  options: ResponseOptions
): Promise<ResponseJson<ValidationLog[]>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/projects/${projectId}/registries/${registryId}/validation_logs`
  );

  return handleJsonResponse(response, options);
};
