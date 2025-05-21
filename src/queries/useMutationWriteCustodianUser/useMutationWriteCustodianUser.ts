import { useMutation } from "@tanstack/react-query";
import { CustodianUser } from "../../types/application";
import {
  patchCustodianUser,
  postCustodianUser,
} from "../../services/custodian_users";

interface UseMutationCustodianWriteUserOptions {
  user: CustodianUser;
  custodianId: number;
}

export default function useMutationWriteCustodianUser({
  user,
  custodianId: custodian_id,
}: UseMutationCustodianWriteUserOptions) {
  return useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (
      payload: Pick<
        CustodianUser,
        "id" | "first_name" | "last_name" | "email" | "permissions"
      >
    ) => {
      if (!user?.id) {
        return postCustodianUser(
          { custodian_id, ...payload },
          {
            error: { message: "createUserError" },
          }
        );
      }

      return patchCustodianUser(
        user.id,
        {
          ...payload,
          custodian_id,
        },
        {
          error: { message: "updateUserError" },
        }
      );
    },
  });
}
