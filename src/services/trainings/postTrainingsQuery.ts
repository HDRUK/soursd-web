import { PostTrainingsPayload } from "./types";
import postTrainings from "./postTrainings";

export default function postTrainingsQuery(registryId: number) {
  return {
    mutationKey: ["postTrainings", registryId],
    mutationFn: (payload: PostTrainingsPayload) => {
      return postTrainings(registryId, payload, {
        error: { message: "postTrainingError" },
      });
    },
  };
}
