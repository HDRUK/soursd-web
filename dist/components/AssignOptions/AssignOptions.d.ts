import { Permission } from "../../services/permissions/types";
import { QueryState } from "@/types/form";
export type AssignOptionsFormValues = Record<string, boolean>;
export interface AssignOptionsProps {
    queryState: QueryState;
    parentData: Permission[];
    subsetData: Permission[];
    onSubmit(values: AssignOptionsFormValues): void;
}
export default function PermissionsSection({ queryState, parentData, subsetData, onSubmit, }: AssignOptionsProps): import("react/jsx-runtime").JSX.Element;
