import { DeleteApprovalPayload, deleteApproval } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { useMutation } from "react-query";

export default function useMutationApprovals() {
  return useMutation(
    ["postApproval"],
    async (payload: DeleteApprovalPayload & { type: EntityType }) => {
      const { type, organisation_id, user_id, ...restPayload } = payload;

      if (type === EntityType.ORGANISATION) {
        return deleteApproval(
          {
            ...restPayload,
            user_id: organisation_id,
          },
          EntityType.ORGANISATION,
          {
            error: {
              message: "updateOrganisationApprovalError",
            },
          }
        );
      }

      return deleteApproval(
        {
          ...restPayload,
          user_id,
        },
        EntityType.RESEARCHER,
        {
          error: { message: "updateApprovalError" },
        }
      );
    }
  );
}
