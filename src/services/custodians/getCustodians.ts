import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodiansResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansResponse>>> => {
  const response = await getRequest(`/custodians`, undefined);

  return handleJsonResponse(response, options);
};
