import { PostApprovalsPayload } from "@/services/approvals";
import postApprovals from "@/services/approvals/postApprovals";
import { EntityType } from "@/types/api";
import { useMutation } from "react-query";

export default function useMutationApprovals() {
  return useMutation(
    ["postApprovals"],
    async (payload: PostApprovalsPayload & { type: EntityType }) => {
      const { type, ...restPayload } = payload;

      if (type === EntityType.ORGANISATION) {
        return postApprovals(restPayload, EntityType.ORGANISATION, {
          error: {
            message: "updateOrganisationApprovalError",
          },
        });
      }

      return postApprovals(restPayload, EntityType.RESEARCHER, {
        error: { message: "updateApprovalError" },
      });
    }
  );
}
