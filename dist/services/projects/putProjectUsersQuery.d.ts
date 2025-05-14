import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProjectUsers from "./putProjectUsers";
import { PutProjectUsersPayload } from "./types";
type PutProjectUsersMutationArgs = MutateWithArgs<{
    id: number;
}, PutProjectUsersPayload>;
export default function putProjectUsersQuery(options?: QueryOptions): UseMutationOptions<Awaited<ReturnType<typeof putProjectUsers>>, Error, PutProjectUsersMutationArgs>;
export {};
