import { ResponseJson, ResponseOptions } from "@/types/requests";
import { Comment } from "@/types/logs";
declare const _default: (validationLogId: number, options: ResponseOptions) => Promise<ResponseJson<Comment[]>>;
export default _default;
