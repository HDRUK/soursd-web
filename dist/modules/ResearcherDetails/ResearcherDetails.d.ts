import { HistoryCombinedData } from "../../queries/useQueriesHistories";
import { Organisation, User } from "@/types/application";
interface ResearcherDetailsProps {
    isApproved: boolean;
    user: User;
    organisation: Organisation;
    histories: HistoryCombinedData;
}
export default function ResearcherDetails({ isApproved, user, organisation, histories, }: ResearcherDetailsProps): import("react/jsx-runtime").JSX.Element;
export {};
