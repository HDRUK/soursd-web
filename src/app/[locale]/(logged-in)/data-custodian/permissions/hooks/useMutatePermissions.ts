import {
  UpdateOrganisationPermissonsPayload,
  postPermissions as postOrganisationPermissions,
} from "@/services/organisations";
import { UpdatePermissonsPayload, postPermissions } from "@/services/users";
import { EntityType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export default function useMutatePermissions(type: EntityType, userId: number) {
  const mutation = useMutation({
    mutationKey: ["postPermissions"],
    mutationFn: (
      payload: UpdatePermissonsPayload | UpdateOrganisationPermissonsPayload
    ) => {
      if (type === EntityType.ORGANISATION) {
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
    },
  });

  const sendRequest = (
    payload: Pick<
      UpdatePermissonsPayload | UpdateOrganisationPermissonsPayload,
      "custodian_id" | "permissions"
    >
  ) => {
    if (type === EntityType.ORGANISATION) {
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
