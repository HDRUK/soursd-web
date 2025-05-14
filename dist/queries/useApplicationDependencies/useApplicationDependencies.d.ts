import { User } from "@/types/application";
import { QueryOptions } from "@/types/requests";
interface UseApplicationDependenciesProps {
    user?: User;
    custodianId?: number;
    organisationId?: number;
}
export default function useApplicationDependencies({ user, custodianId, organisationId }: UseApplicationDependenciesProps, options?: QueryOptions): any;
export {};
