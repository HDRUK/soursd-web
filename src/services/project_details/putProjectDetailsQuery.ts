import { PutProjectDetailsPayload } from "./types";
import putProjectDetails from "./putProjectDetails";

export default function putProjectDetailsQuery(id: number) {
  return {
    mutationKey: ["putProjectDetails"],
    mutationFn: (payload: PutProjectDetailsPayload) => {
      return putProjectDetails(payload, id, {
        error: { message: "putProjectDetailsError" },
      });
    },
  };
}
