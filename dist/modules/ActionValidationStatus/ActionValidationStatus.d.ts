import { ApprovalResponse } from "@/services/approvals";
export interface ActionValidationStatusFormValues {
    status: number;
    comment: string;
}
export type UseApprovalHook<TParams> = (params: TParams) => {
    data?: ApprovalResponse;
    approve: (comment: string) => void;
    reject: (comment: string) => void;
    isLoading: boolean;
    isError?: boolean;
};
interface ActionValidationStatusProps<TParams> {
    useApprovalHook: UseApprovalHook<TParams>;
    hookParams: TParams;
}
declare const ActionValidationStatus: <TParams>({ useApprovalHook, hookParams, }: ActionValidationStatusProps<TParams>) => import("react/jsx-runtime").JSX.Element;
export default ActionValidationStatus;
