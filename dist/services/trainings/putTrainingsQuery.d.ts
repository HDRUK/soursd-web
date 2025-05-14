import { PutTrainingsPayload } from "./types";
export default function putTrainingsQuery(id: number): {
    mutationKey: string[];
    mutationFn: (payload: PutTrainingsPayload) => Promise<ResponseJson<ResearcherTraining>>;
};
