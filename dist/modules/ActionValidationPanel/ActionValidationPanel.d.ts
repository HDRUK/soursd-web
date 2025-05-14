import { ValidationLog } from "@/types/logs";
import { QueryState } from "@/types/form";
export declare const ActionValidationVariants: {
    readonly ProjectUser: "ProjectUser";
    readonly Organisation: "Organisation";
};
interface ActionValidationPanelProps {
    variant: keyof typeof ActionValidationVariants;
    logs: ValidationLog[];
    queryState: QueryState;
}
declare function ActionValidationPanel({ variant, logs, queryState, }: ActionValidationPanelProps): import("react/jsx-runtime").JSX.Element;
export default ActionValidationPanel;
