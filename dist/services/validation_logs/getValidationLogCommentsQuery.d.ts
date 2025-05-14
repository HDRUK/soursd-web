import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getValidationLogComments from "./getValidationLogComments";
export default function getValidationLogCommentsQuery(validationLogId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getValidationLogComments>>>;
