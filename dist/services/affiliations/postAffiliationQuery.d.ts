import { User } from "@/types/application";
import { PostAffiliationPayload } from "./types";
export default function postAffiliationQuery(user: User): {
    mutationKey: (string | number)[];
    mutationFn: (payload: PostAffiliationPayload) => Promise<import("../../types/requests").ResponseJson<import("@/types/application").ResearcherAffiliation>>;
};
