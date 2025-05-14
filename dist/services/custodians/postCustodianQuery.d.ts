import { PostCustodianPayload } from "./types";
export default function postCustodianQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostCustodianPayload) => Promise<ResponseJson<number>>;
};
