import {
  PostRegisterResearcherPayload,
  postRegisterResearcher,
} from "@/services/auth";
import { ResearcherInviteResponse } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { useMutation } from "react-query";

export default function useMutationRegister(
  user: ResearcherInviteResponse | undefined
) {
  return useMutation(
    ["postRegisterResearcher"],
    async (payload: PostRegisterResearcherPayload) => {
      const { consent_scrape, ...restPayload } = payload;

      const contentScrape = {
        consent_scrape: consent_scrape ? 1 : 0,
      };

      if (user) {
        await patchUser(user.id, contentScrape, {
          error: { message: "submitError" },
        });
      }

      return postRegisterResearcher(
        {
          ...restPayload,
          ...contentScrape,
        },
        {
          error: { message: "submitError" },
        }
      );
    }
  );
}
