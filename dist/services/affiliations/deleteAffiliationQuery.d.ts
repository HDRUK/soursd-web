import { UseMutationOptions } from "@tanstack/react-query";
import { MutationOptions } from "@/types/requests";
import deleteAffiliation from "./deleteAffiliation";
export default function deleteAffiliationQuery(options?: MutationOptions): UseMutationOptions<Awaited<ReturnType<typeof deleteAffiliation>>, Error, number>;
