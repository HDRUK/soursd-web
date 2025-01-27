import postUserInvite from "./postUserInvite";

export default function postUserInviteQuery() {
  return {
    mutationKey: ["postUserInvite"],
    mutationFn: (id: number) => {
      return postUserInvite(id, {
        error: { message: "postUserInviteError" },
      });
    },
  };
}
