import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getCustodian, getCustodianQuery } from "@/services/custodians";
import {
  getOrganisation,
  getOrganisationQuery,
} from "@/services/organisations";
import { getPermissions, getPermissionsQuery } from "@/services/permissions";
import { getProjectRoles } from "@/services/project_roles";
import getProjectRolesQuery from "@/services/project_roles/getProjectRolesQuery";
import { getSectors, getSectorsQuery } from "@/services/sectors";
import {
  getSystemConfig,
  getSystemConfigQuery,
} from "@/services/system_config";
import { getUser } from "@/services/users";
import getUserQuery from "@/services/users/getUserQuery";
import { User } from "@/types/application";
import { QueryOptions } from "@/types/requests";

interface UseApplicationDependenciesProps {
  user?: User;
  custodianId?: number;
  organisationId?: number;
}

interface ApplicationDependenciesCombinedData {
  getSystemConfig: Awaited<ReturnType<typeof getSystemConfig>>;
  getUser: Awaited<ReturnType<typeof getUser>>;
  getOrganisation: Awaited<ReturnType<typeof getOrganisation>>;
  getSectors: Awaited<ReturnType<typeof getSectors>>;
  getPermissions: Awaited<ReturnType<typeof getPermissions>>;
  getCustodian: Awaited<ReturnType<typeof getCustodian>>;
  getProjectRoles: Awaited<ReturnType<typeof getProjectRoles>>;
}

export default function useApplicationDependencies(
  { user, custodianId, organisationId }: UseApplicationDependenciesProps,
  options: QueryOptions = {}
) {
  const queries = user
    ? [
        getSystemConfigQuery(),
        getUserQuery(user.id, options),
        ...(organisationId
          ? [getOrganisationQuery(organisationId, options)]
          : []),
        ...(custodianId ? [getCustodianQuery(custodianId, options)] : []),
        getSectorsQuery(options),
        getPermissionsQuery(options),
        getProjectRolesQuery(options),
      ]
    : [];
  return useQueriesCombined<ApplicationDependenciesCombinedData>(queries);
}
