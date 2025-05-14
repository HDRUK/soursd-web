import { User } from "@/types/application";
import { PostAffiliationPayload } from "./types";
export default function postAffiliationQuery(user: User): {
    mutationKey: any[];
    mutationFn: (payload: PostAffiliationPayload) => Promise<ResponseJson<ResearcherAffiliation>>;
};
