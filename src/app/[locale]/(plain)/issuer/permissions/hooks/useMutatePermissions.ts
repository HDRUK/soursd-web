import {
  UpdateOrganisationPermissonsPayload,
  postPermissions as postOrganisationPermissions,
} from "@/services/organisations";
import { UpdatePermissonsPayload, postPermissions } from "@/services/users";
import { EntityType } from "@/types/api";
import { useMutation } from "react-query";

export default function useMutatePermissions(type: EntityType, userId: number) {
  const mutation = useMutation(
    ["postPermissions"],
    async (
      payload: UpdatePermissonsPayload | UpdateOrganisationPermissonsPayload
    ) => {
      if (type === EntityType.organisation) {
        return postOrganisationPermissions(
          payload as UpdateOrganisationPermissonsPayload,
          {
            error: {
              message: "updateOrganisationPermissionsError",
            },
          }
        );
      }

      return postPermissions(payload as UpdatePermissonsPayload, {
        error: { message: "updatePermissionsError" },
      });
    }
  );

  const sendRequest = (
    payload: Pick<
      UpdatePermissonsPayload | UpdateOrganisationPermissonsPayload,
      "issuer_id" | "permissions"
    >
  ) => {
    if (type === EntityType.organisation) {
      return mutation.mutateAsync({
        ...payload,
        organisation_id: userId,
      });
    }

    return mutation.mutateAsync({
      ...payload,
      user_id: userId,
    });
  };

  return {
    ...mutation,
    sendRequest,
  };
}
