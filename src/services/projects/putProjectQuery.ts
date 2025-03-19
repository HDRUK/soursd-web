import putProject from "./putProject";
import { PutProjectPayload } from "./types";

export default function putProjectQuery(id: number) {
  return {
    mutationKey: ["putProject", id],
    mutationFn: (payload: PutProjectPayload) => {
      return putProject(payload.id, payload, {
        error: { message: "putProjectError" },
      });
    },
  };
}
