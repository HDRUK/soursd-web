import { PostApprovalPayload, postApproval } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export default function useMutationApprovals() {
  return useMutation({
    mutationKey: ["postApproval"],
    mutationFn: (payload: PostApprovalPayload & { type: EntityType }) => {
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
    },
  });
}
