import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProjectDetails from "./getProjectDetailsByProjectId";
export default function getProjectDetailsQuery(id: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getProjectDetails>>>;
