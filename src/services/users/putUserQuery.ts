import putUser from "./putUser";
import { PutUserPayload } from "./types";

export default function putUserQuery(userId: number) {
  return {
    mutationKey: ["putUserQuery"],
    mutationFn: (payload: PutUserPayload) =>
      putUser(userId, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
