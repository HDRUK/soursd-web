import { ProjectUser } from "@/types/application";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PutPrimaryContactPayload } from "./types";
declare const _default: (projectId: number, registryId: number, payload: PutPrimaryContactPayload, options: ResponseOptions) => Promise<ResponseJson<ProjectUser>>;
export default _default;
