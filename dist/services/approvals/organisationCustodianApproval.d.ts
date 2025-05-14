import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ApprovalResponse } from "./types";
type RequestMethod = "POST" | "GET" | "DELETE";
interface PostApprovalPayload {
    approved: number;
    comment: string;
}
declare const _default: (method: RequestMethod, custodianId: string | number, organisationId: string | number, payload: PostApprovalPayload | undefined, options: ResponseOptions) => Promise<ResponseJson<ApprovalResponse>>;
export default _default;
