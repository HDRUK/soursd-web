import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getCustodian } from "@/services/custodians";
import { getOrganisation } from "@/services/organisations";
import { getPermissions, PermissionsResponse } from "@/services/permissions";
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
  custodianId?: number;
  organisationId?: number;
}

interface ApplicationDependenciesCombinedData {
  getSystemConfig: ResponseJson<GetSystemConfigResponse>;
  getUser: ResponseJson<User>;
  getOrganisation: ResponseJson<Organisation>;
  getSectors: ResponseJson<Paged<SectorsResponse>>;
  getPermissions: ResponseJson<Paged<PermissionsResponse>>;
  getCustodian: ResponseJson<Custodian>;
}

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

export default function useApplicationDependencies({
  user,
  custodianId,
  organisationId,
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
    ...(organisationId
      ? [
          {
            queryKey: ["getOrganisation", organisationId],
            queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
              getOrganisation(queryKey[1], {
                error: {
                  message: "getOrganisationError",
                },
              }),
            enabled: !!organisationId,
          },
        ]
      : []),
    ...(custodianId
      ? [
          {
            queryKey: ["getCustodian", custodianId],
            queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
              getCustodian(queryKey[1], {
                error: {
                  message: "getCustodianError",
                },
              }),
            enabled: !!custodianId,
          },
        ]
      : []),
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
    {
      queryKey: ["getPermissions"],
      queryFn: () =>
        getPermissions({
          error: {
            message: "getPermissionsError",
          },
        }),
    },
  ];

  return useQueriesCombined<ApplicationDependenciesCombinedData>(queries);
}
