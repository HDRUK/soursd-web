import { PutTrainingsPayload } from "./types";
export default function putTrainingsQuery(id: number): {
    mutationKey: string[];
    mutationFn: (payload: PutTrainingsPayload) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").ResearcherTraining>>;
};
