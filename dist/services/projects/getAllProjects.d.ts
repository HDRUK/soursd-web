import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectsResponse } from "./types";
declare const _default: (registryId: number | string, options: ResponseOptions) => Promise<ResponseJson<ProjectsResponse>>;
export default _default;
