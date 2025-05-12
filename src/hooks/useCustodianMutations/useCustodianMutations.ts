import { useMutation } from "@tanstack/react-query";
import { organisationCustodianApproval } from "@/services/approvals";

type MutationOptions = {
  custodianId: number | string;
  organisationId: number | string;
  onSuccess?: () => void;
};

export const useApproveOrganisation = ({
  custodianId,
  organisationId,
  onSuccess,
}: MutationOptions) => {
  return useMutation({
    mutationFn: (comment: string) =>
      organisationCustodianApproval(
        "POST",
        custodianId,
        organisationId,
        { approved: 1, comment },
        {
          error: { message: "approvalError" },
        }
      ),
    onSuccess,
  });
};

export const useRejectOrganisation = ({
  custodianId,
  organisationId,
  onSuccess,
}: MutationOptions) => {
  return useMutation({
    mutationFn: (comment: string) =>
      organisationCustodianApproval(
        "POST",
        custodianId,
        organisationId,
        { approved: 0, comment },
        {
          error: { message: "rejectionError" },
        }
      ),
    onSuccess,
  });
};
