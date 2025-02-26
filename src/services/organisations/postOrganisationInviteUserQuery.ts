import postOrganisationInviteUser from "./postOrganisationInviteUser";
import { PostOrganisationInviteUserPayload } from "./types";

export default function postOrganisationInviteUserQuery(
  organisationId: number
) {
  return {
    mutationKey: ["postOrganisationInviteUser"],
    mutationFn: async (payload: PostOrganisationInviteUserPayload) => {
      return postOrganisationInviteUser(organisationId, payload, {
        error: { message: "postOrganisationInviteUserError" },
      });
    },
  };
}
