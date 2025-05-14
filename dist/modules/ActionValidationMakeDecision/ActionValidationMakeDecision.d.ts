import { ValidationLog } from "@/types/logs";
interface ActionValidationMakeDecisionProps {
    log: ValidationLog;
    onAction?: () => Promise<void>;
}
export default function ActionValidationMakeDecision({ log, onAction, }: ActionValidationMakeDecisionProps): import("react/jsx-runtime").JSX.Element;
export {};
