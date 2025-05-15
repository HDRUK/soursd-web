import { PatchUserPayload } from "./types";
export default function patchUserQuery(userId: number): {
    mutationKey: string[];
    mutationFn: (payload: PatchUserPayload) => Promise<import("../../types/requests").ResponseJson<import("./types").PatchUserResponse>>;
};
