import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postCustodianProject from "./postCustodianProject";
import { PostCustodianProjectPayload } from "./types";
type PostCustodianProjectMutationArgs = MutateWithArgs<{
    custodianId: number;
}, PostCustodianProjectPayload>;
export default function postCustodianProjectQuery(options?: QueryOptions): UseMutationOptions<Awaited<ReturnType<typeof postCustodianProject>>, Error, PostCustodianProjectMutationArgs>;
export {};
