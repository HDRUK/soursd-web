import { FilePayload } from "./types";
import postFile from "./postFile";

export default function postAffiliationQuery() {
  return {
    mutationKey: ["postFile"],
    mutationFn: (payload: FilePayload) => {
      return postFile(payload, {
        error: { message: "cvUploadFailed" },
      });
    },
  };
}
