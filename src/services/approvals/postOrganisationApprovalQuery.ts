import { organisationCustodianApproval } from "@/services/approvals";

type MutationOptions = {
  custodianId: number | string;
  organisationId: number | string;
};

type ApprovalPayload = {
  approved: number;
  comment: string;
};

const postOrganisationApprovalQuery = ({
  custodianId,
  organisationId,
}: MutationOptions) => {
  return {
    mutationFn: ({ approved, comment }: ApprovalPayload) =>
      organisationCustodianApproval(
        "POST",
        custodianId,
        organisationId,
        { approved, comment },
        {
          error: { message: "approvalError" },
        }
      ),
  };
};

export default postOrganisationApprovalQuery;
