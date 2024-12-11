import { ISSUER_ID } from "@/consts/application";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getIssuer } from "@/services/issuers";
import { getOrganisation } from "@/services/organisations";
import { getSectors } from "@/services/sectors";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import { User } from "@/types/application";

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
      queryFn: ({ queryKey }) =>
        getSectors(queryKey[1], {
          error: {
            message: "getSectorsError",
          },
        }),
    },
  ];

  return useQueriesCombined(queries);
}
