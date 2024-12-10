import { ISSUER_ID } from "@/consts/application";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getIssuer } from "@/services/issuers";
import { getOrganisation } from "@/services/organisations";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import { User } from "@/types/application";

interface UseApplicationDependenciesProps {
  user: User;
}

export default function useApplicationDependencies({
  user,
}: UseApplicationDependenciesProps) {
  console.log("user", user);
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
      queryKey: ["getIssuer", ISSUER_ID],
      queryFn: ({ queryKey }) =>
        getIssuer(queryKey[1], {
          error: {
            message: "getIssuerError",
          },
        }),
    },
  ];

  return useQueriesCombined(queries);
}
