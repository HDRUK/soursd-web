import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectAllUserResponse } from "./types";
declare const _default: (projectId: number, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<ProjectAllUserResponse>>>;
export default _default;
