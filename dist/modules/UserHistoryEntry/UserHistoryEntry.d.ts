import { ReactNode } from "react";
import { File as AppFile } from "@/types/application";
interface UserHistoryEntryProps {
    heading: ReactNode;
    startDate: string;
    description: ReactNode;
    endDate?: string;
    certification: AppFile[] | undefined;
}
export default function UserHistoryEntry({ heading, startDate, endDate, description, certification, }: UserHistoryEntryProps): import("react/jsx-runtime").JSX.Element;
export {};
