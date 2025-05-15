import { PutPrimaryContactQuery } from "./types";
export default function putProjectUserPrimaryContactQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PutPrimaryContactQuery) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").ProjectUser>>;
};
