import { PatchUserPayload } from "./types";
export default function patchUserQuery(userId: number): {
    mutationKey: string[];
    mutationFn: (payload: PatchUserPayload) => Promise<ResponseJson<import("./types").PatchUserResponse>>;
};
