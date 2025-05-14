import { PutUserPayload } from "./types";
export default function putUserQuery(userId: number): {
    mutationKey: string[];
    mutationFn: (payload: PutUserPayload) => Promise<ResponseJson<User>>;
};
