import { ResponseJson, ResponseOptions } from "@/types/requests";
import { FileResponse, FilePayload } from "./types";
declare const _default: (payload: FilePayload, options: ResponseOptions) => Promise<ResponseJson<FileResponse>>;
export default _default;
