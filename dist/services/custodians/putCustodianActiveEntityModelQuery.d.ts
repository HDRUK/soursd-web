import { PutCustodianActiveEntityModelPayload } from "./types";
export default function putCustodianActiveEntityModelQuery(custodianId: number | undefined): {
    mutationKey: string[];
    mutationFn: (payload: PutCustodianActiveEntityModelPayload) => Promise<ResponseJson<import("./types").PutCustodianActiveEntityModelResponse>>;
};
