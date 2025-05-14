import { ResearcherTraining, File as AppFile } from "@/types/application";
interface ResearcherTrainingEntryProps {
    data: ResearcherTraining;
    certification: AppFile[] | undefined;
}
export default function ResearcherTrainingEntry({ data, certification, }: ResearcherTrainingEntryProps): import("react/jsx-runtime").JSX.Element;
export {};
