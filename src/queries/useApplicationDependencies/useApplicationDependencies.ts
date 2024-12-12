import { ISSUER_ID } from "@/consts/application";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getCustodian } from "@/services/custodians";
import { getOrganisation } from "@/services/organisations";
import { getSystemConfig } from "@/services/system_config";
import { GetSystemConfigResponse } from "@/services/system_config/types";
import { getUser } from "@/services/users";
import { Custodian, Organisation, User } from "@/types/application";
import { ResponseJson } from "@/types/requests";

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
      queryKey: ["getOrganisation", user.organisation_id],
      queryFn: ({ queryKey }) =>
        getOrganisation(queryKey[1], {
          error: {
            message: "getOrganisationError",
          },
        }),
      enabled: !!user.organisation_id,
    },
    {
      queryKey: ["getCustodian", ISSUER_ID],
      queryFn: ({ queryKey }) =>
        getCustodian(queryKey[1], {
          error: {
            message: "getCustodianError",
          },
        }),
    },
  ];

  return useQueriesCombined<{
    getSystemConfig: ResponseJson<GetSystemConfigResponse>;
    getUser: ResponseJson<User>;
    getOrganisation: ResponseJson<Organisation>;
    getCustodian: ResponseJson<Custodian>;
  }>(queries);
}
