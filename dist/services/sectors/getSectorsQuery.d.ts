import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getSectors from "./getSectors";
export default function getSectorsQuery(options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getSectors>>>;
