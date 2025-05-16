import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { EntityType, GetCustodianEntityModelResponse } from "./types";

export default async (
  id: number,
  entity_type: EntityType,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianEntityModelResponse[]>> => {
  const response = await getRequest(
    `/custodian_config/${id}/entity_models?entity_model_type=${entity_type}`
  );

  return handleJsonResponse(response, options);
};
