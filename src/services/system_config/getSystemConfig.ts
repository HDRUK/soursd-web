import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetSystemConfigResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetSystemConfigResponse>> => {
  const response = await getRequest(`/system_config`);

  return handleJsonResponse(response, options);
};
