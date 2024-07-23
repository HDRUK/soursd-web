import { PostApprovalPayload, postApproval } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { useMutation } from "react-query";

export default function useMutationApprovals() {
  return useMutation(
    ["postApproval"],
    async (payload: PostApprovalPayload & { type: EntityType }) => {
      const { type, ...restPayload } = payload;

      if (type === EntityType.ORGANISATION) {
        return postApproval(restPayload, EntityType.ORGANISATION, {
          error: {
            message: "updateOrganisationApprovalError",
          },
        });
      }

      return postApproval(restPayload, EntityType.RESEARCHER, {
        error: { message: "updateApprovalError" },
      });
    }
  );
}
