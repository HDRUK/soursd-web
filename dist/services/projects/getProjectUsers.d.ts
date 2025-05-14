import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectUsersResponse } from "./types";
declare const _default: (projectId: number, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<ProjectUsersResponse>>>;
export default _default;
