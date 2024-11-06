import {
  PostRegisterResearcherPayload,
  postRegisterResearcher,
} from "@/services/auth";
import { ResearcherInviteResponse } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { useMutation } from "@tanstack/react-query";

export default function useMutationRegister(
  user: ResearcherInviteResponse | undefined
) {
  return useMutation({
    mutationKey: ["postRegisterResearcher"],
    mutationFn: async (payload: PostRegisterResearcherPayload) => {
      if (user) {
        await patchUser(user.id, payload, {
          error: { message: "submitError" },
        });
      }

      return postRegisterResearcher(payload, {
        error: { message: "submitError" },
      });
    },
  });
}
