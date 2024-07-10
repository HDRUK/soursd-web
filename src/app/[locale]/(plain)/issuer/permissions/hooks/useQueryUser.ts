import { getOrganisation } from "@/services/organisations";
import { getUser } from "@/services/users";
import { EntityType } from "@/types/api";
import { useQuery } from "react-query";

export default function useQueryUser(type: EntityType, userId: number) {
  return useQuery(["getUser", userId], async ({ queryKey }) => {
    const [, id] = queryKey;

    if (type === EntityType.organisation) {
      return getOrganisation(id, {
        error: {
          message: "getOrganisationError",
        },
      });
    }

    return getUser(id, {
      error: {
        message: "getUserError",
      },
    });
  });
}
