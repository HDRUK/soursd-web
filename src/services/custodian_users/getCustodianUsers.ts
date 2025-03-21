import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodiansUsersResponse } from "./types";

export default async (
  custodianId: string | number | undefined,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  // this is a temporary placeholder... this will have to be fixed soon
  // - need to return custodian users FOR a custodian
  // - as of now, the BE just returns all custodian users
  const response = await getRequest(
    `/custodian_users` // note - update in some way? ${custodianId}`,
  );

  return handleJsonResponse(response, options);
};
