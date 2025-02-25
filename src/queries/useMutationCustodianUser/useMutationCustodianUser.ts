import {
  patchCustodianUser,
  postCustodianUser,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export default function useCustodianUserUpdateQuery(userId?: number) {
  return useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (payload: Omit<CustodianUser, "created_at" | "updated_at">) => {
      if (!userId) {
        return postCustodianUser(payload, {
          error: { message: "createUserError" },
        });
      }

      return patchCustodianUser(userId, payload, {
        error: { message: "createUserError" },
      });
    },
  });
}
