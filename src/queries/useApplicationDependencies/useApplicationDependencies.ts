import { CUSTODIAN_ID } from "@/consts/application";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getCustodian } from "@/services/custodians";
import { getOrganisation } from "@/services/organisations";
import { getSectors } from "@/services/sectors";
import { SectorsResponse } from "@/services/sectors/types";
import { getSystemConfig } from "@/services/system_config";
import { GetSystemConfigResponse } from "@/services/system_config/types";
import { getUser } from "@/services/users";
import { Custodian, Organisation, User } from "@/types/application";
import { Paged, ResponseJson } from "@/types/requests";
import { QueryFunctionContext } from "@tanstack/react-query";

interface UseApplicationDependenciesProps {
  user?: User;
}

interface ApplicationDependenciesCombinedData {
  getSystemConfig: ResponseJson<GetSystemConfigResponse>;
  getUser: ResponseJson<User>;
  getOrganisation: ResponseJson<Organisation>;
  getSectors: ResponseJson<Paged<SectorsResponse>>;
  getCustodian: ResponseJson<Custodian>;
}

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

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
      enabled: !!user,
    },
    {
      queryKey: ["getUser", user?.id],
      queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
        getUser(queryKey[1], {
          error: {
            message: "getUserError",
          },
        }),
      enabled: !!user,
    },
    {
      queryKey: ["getOrganisation", 1],
      queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
        getOrganisation(queryKey[1], {
          error: {
            message: "getOrganisationError",
          },
        }),
      enabled: !!user,
    },
    {
      queryKey: ["getCustodian", CUSTODIAN_ID],
      queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
        getCustodian(queryKey[1], {
          error: {
            message: "getCustodianError",
          },
        }),
      enabled: !!user,
    },
    {
      queryKey: ["getSectors"],
      queryFn: () =>
        getSectors({
          error: {
            message: "getSectorsError",
          },
        }),
      enabled: !!user,
    },
  ];

  return useQueriesCombined<ApplicationDependenciesCombinedData>(queries);
}
