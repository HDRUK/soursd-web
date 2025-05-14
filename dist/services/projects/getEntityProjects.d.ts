import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectsResponse } from "./types";
export type ProjectEntities = "organisation" | "custodian" | "user";
declare const _default: (entity: ProjectEntities, id: string | number | undefined, searchParams: Record<string, string | number | undefined>, options: ResponseOptions) => Promise<ResponseJson<Paged<ProjectsResponse>>>;
export default _default;
