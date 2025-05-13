import { ColumnDef } from "@tanstack/react-table";
import { StoreUserHistories } from "@/data/store";
import { ResearcherAffiliation } from "@/types/application";
import { PaginatedQueryHelpers } from "@/hooks/usePaginatedQuery";
interface AffiliationsProps {
    setHistories?: (histories: StoreUserHistories) => void;
    getHistories?: () => StoreUserHistories | undefined;
    extraColumns?: ColumnDef<ResearcherAffiliation>[];
    affiliationsData: ResearcherAffiliation[] | undefined;
    getAffiliationsQueryState: Partial<PaginatedQueryHelpers>;
    last_page: number;
    total: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function Affiliations({ setHistories, getHistories, extraColumns, affiliationsData, getAffiliationsQueryState, last_page, total, setPage, }: AffiliationsProps): import("react/jsx-runtime").JSX.Element;
export {};
