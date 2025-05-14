import { ActionsPanelProps } from "@/components/ActionsPanel";
import { ActionLogEntity } from "@/types/logs";
interface ActionLogProps {
    variant: ActionLogEntity;
    panelProps: Omit<ActionsPanelProps, "children">;
}
export default function ActionLogs({ variant, panelProps }: ActionLogProps): import("react/jsx-runtime").JSX.Element;
export {};
