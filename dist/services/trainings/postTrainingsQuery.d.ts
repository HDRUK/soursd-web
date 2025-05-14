import { PostTrainingsPayload } from "./types";
export default function postTrainingsQuery(registryId: number): {
    mutationKey: (string | number)[];
    mutationFn: (payload: PostTrainingsPayload) => Promise<ResponseJson<number>>;
};
