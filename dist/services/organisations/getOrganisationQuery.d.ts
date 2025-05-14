import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getOrganisation from "./getOrganisation";
export default function getOrganisationQuery(organisationId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getOrganisation>>>;
