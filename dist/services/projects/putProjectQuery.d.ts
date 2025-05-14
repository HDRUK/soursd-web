import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProject from "./putProject";
import { PutProjectPayload } from "./types";
type PutProjectMutationArgs = MutateWithArgs<{
    id: number;
}, PutProjectPayload>;
export default function putProjectQuery(options?: QueryOptions): UseMutationOptions<Awaited<ReturnType<typeof putProject>>, Error, PutProjectMutationArgs>;
export {};
