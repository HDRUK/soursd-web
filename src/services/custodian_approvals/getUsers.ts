import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectUsersResponse } from "./types";

export default async (
  custodianId: number,
  options: ResponseOptions
): Promise<ResponseJson<ProjectUsersResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectUsers`
  );

  return handleJsonResponse(response, options);
};
