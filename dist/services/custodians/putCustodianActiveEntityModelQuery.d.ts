import { PutCustodianActiveEntityModelPayload } from "./types";
export default function putCustodianActiveEntityModelQuery(custodianId: number | undefined): {
    mutationKey: string[];
    mutationFn: (payload: PutCustodianActiveEntityModelPayload) => Promise<import("../../types/requests").ResponseJson<import("./types").PutCustodianActiveEntityModelResponse>>;
};
