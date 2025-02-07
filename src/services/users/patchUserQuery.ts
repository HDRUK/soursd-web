import patchUser from "./patchUser";
import { PatchUserPayload } from "./types";

export default function patchUserQuery(userId: number) {
  return {
    mutationKey: ["patchUser"],
    mutationFn: (payload: PatchUserPayload) =>
      patchUser(userId, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
