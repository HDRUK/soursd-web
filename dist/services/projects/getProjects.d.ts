import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectsResponse } from "./types";
declare const _default: (searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<ProjectsResponse>>>;
export default _default;
