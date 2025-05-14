import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProfessionalRegistrations from "./getProfessionalRegistrations";
export default function getProfessionalRegistrationsQuery(registry_id: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getProfessionalRegistrations>>>;
