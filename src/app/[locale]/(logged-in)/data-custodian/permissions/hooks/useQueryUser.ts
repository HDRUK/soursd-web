import { getOrganisation } from "@/services/organisations";
import { getUser } from "@/services/users";
import { EntityType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function useQueryUser(type: EntityType, userId: number) {
  return useQuery({
    queryKey: ["getUser", userId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      if (type === EntityType.ORGANISATION) {
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
    },
  });
}
