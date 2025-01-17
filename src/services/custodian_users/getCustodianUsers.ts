import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { GetCustodiansUsersResponse } from "./types";

export default async (
  custodianId: string | number | undefined,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  // this is a temporary placeholder... this will have to be fixed soon
  // - need to return custodian users FOR a custodian
  // - as of now, the BE just returns all custodian users
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users`, // note - update in some way? ${custodianId}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, options);

  if (error) return Promise.reject(error);

  return response.json();
};
