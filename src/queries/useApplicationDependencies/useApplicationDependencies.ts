import { ISSUER_ID } from "@/consts/application";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getIssuer } from "@/services/issuers";
import { getOrganisation } from "@/services/organisations";
import { getSectors } from "@/services/sectors";
import { SectorsResponse } from "@/services/sectors/types";
import { getSystemConfig } from "@/services/system_config";
import { GetSystemConfigResponse } from "@/services/system_config/types";
import { getUser } from "@/services/users";
import { Issuer, Organisation, User } from "@/types/application";
import { Paged, ResponseJson } from "@/types/requests";

interface UseApplicationDependenciesProps {
  user: User;
}

export default function useApplicationDependencies({
  user,
}: UseApplicationDependenciesProps) {
  const queries = [
    {
      queryKey: ["getSystemConfig"],
      queryFn: () =>
        getSystemConfig({
          error: {
            message: "getSystemConfigError",
          },
        }),
    },
    {
      queryKey: ["getUser", user.id],
      queryFn: ({ queryKey }) =>
        getUser(queryKey[1], {
          error: {
            message: "getUserError",
          },
        }),
    },
    {
      queryKey: ["getOrganisation", 1],
      queryFn: ({ queryKey }) =>
        getOrganisation(queryKey[1], {
          error: {
            message: "getOrganisationError",
          },
        }),
      enabled: !!1,
    },
    {
      queryKey: ["getIssuer", ISSUER_ID],
      queryFn: ({ queryKey }) =>
        getIssuer(queryKey[1], {
          error: {
            message: "getIssuerError",
          },
        }),
    },
    {
      queryKey: ["getSectors"],
      queryFn: () =>
        getSectors({
          error: {
            message: "getSectorsError",
          },
        }),
    },
  ];

  return useQueriesCombined<{
    getSystemConfig: ResponseJson<GetSystemConfigResponse>;
    getUser: ResponseJson<User>;
    getOrganisation: ResponseJson<Organisation>;
    getIssuer: ResponseJson<Issuer>;
    getSectors: ResponseJson<Paged<SectorsResponse>>;
  }>(queries);
}
