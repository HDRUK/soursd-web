import { StoreUserHistories } from "@/data/store";
import { ResearcherProfessionalRegistration, User } from "@/types/application";
import { EntityType } from "@/types/api";
interface ProfessionalRegistrationsProps {
    variant: EntityType;
    user: User;
    setHistories?: (histories: StoreUserHistories) => void;
    getHistories?: () => StoreUserHistories | undefined;
    professionalRegistrations: ResearcherProfessionalRegistration[];
}
export default function ProfessionalRegistrations({ variant, user, setHistories, getHistories, professionalRegistrations, }: ProfessionalRegistrationsProps): import("react/jsx-runtime").JSX.Element;
export {};
