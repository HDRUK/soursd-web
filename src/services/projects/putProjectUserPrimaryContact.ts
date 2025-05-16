import { ProjectUser } from "../../types/application";
import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutPrimaryContactPayload } from "./types";

export default async (
  projectId: number,
  registryId: number,
  payload: PutPrimaryContactPayload,
  options: ResponseOptions
): Promise<ResponseJson<ProjectUser>> => {
  const response = await putRequest(
    `/projects/${projectId}/users/${registryId}/primary_contact`,
    payload
  );

  return handleJsonResponse(response, options);
};
