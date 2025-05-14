import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostApprovalPayload } from "./types";
declare const _default: (payload: PostApprovalPayload, entityType: EntityType, options: ResponseOptions) => Promise<ResponseJson<boolean>>;
export default _default;
