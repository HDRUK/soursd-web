import { getAccreditations } from "@/services/accreditations";
import getAffiliations from "@/services/affiliations/getAffiliations";
import { getEducations } from "@/services/educations";
import { getProfessionalRegistrations } from "@/services/professional_registrations";
import { getUserApprovedProjects } from "@/services/projects";
import { getTrainingByRegistryId } from "@/services/trainings";
import { QueryOptions } from "@/types/requests";
export interface HistoryCombinedData {
    getEducations: Awaited<ReturnType<typeof getEducations>>;
    getTrainings: Awaited<ReturnType<typeof getTrainingByRegistryId>>;
    getUserApprovedProjects: Awaited<ReturnType<typeof getUserApprovedProjects>>;
    getAccreditations: Awaited<ReturnType<typeof getAccreditations>>;
    getAffiliations: Awaited<ReturnType<typeof getAffiliations>>;
    getProfessionalRegistrations: Awaited<ReturnType<typeof getProfessionalRegistrations>>;
}
export default function useQueriesHistory(registryId?: number, options?: QueryOptions): any;
