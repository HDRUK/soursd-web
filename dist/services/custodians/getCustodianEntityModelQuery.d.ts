import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { EntityType } from "./types";
import getCustodianEntityModel from "./getCustodianEntityModel";
export default function getCustodianEntityModelQuery(custodianId: number | undefined, entity_type: EntityType, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodianEntityModel>>>;
