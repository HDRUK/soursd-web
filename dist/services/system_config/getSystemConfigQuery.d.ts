import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getSystemConfig from "./getSystemConfig";
export default function getSystemConfigQuery(options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getSystemConfig>>>;
