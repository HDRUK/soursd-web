import postOrganisationInvite from "./postOrganisationInvite";

export default function postOrganisationInviteQuery() {
  return {
    mutationKey: ["postOrganisationInvite"],
    mutationFn: (organisationId: number) => {
      console.log("*** postOrganisationInvite PAYLOAD", organisationId);
      return postOrganisationInvite(organisationId, {
        error: { message: "postOrganisationInviteError" },
      });
    },
  };
}
