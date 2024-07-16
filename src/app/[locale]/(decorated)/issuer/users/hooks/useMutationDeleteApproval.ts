import { DeleteApprovalPayload, deleteApproval } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { useMutation } from "react-query";

export default function useMutationApprovals() {
  return useMutation(
    ["postApproval"],
    async (payload: DeleteApprovalPayload & { type: EntityType }) => {
      const { type, ...restPayload } = payload;

      if (type === EntityType.ORGANISATION) {
        return deleteApproval(restPayload, EntityType.ORGANISATION, {
          error: {
            message: "updateOrganisationApprovalError",
          },
        });
      }

      return deleteApproval(restPayload, EntityType.RESEARCHER, {
        error: { message: "updateApprovalError" },
      });
    }
  );
}
