import { ChipProps } from "@mui/material";
export declare enum Status {
    AFFILIATED = "affiliated",
    PENDING = "pending",
    INVITED = "invited",
    REGISTERED = "registered",
    INVITE_SENT = "invite_sent",
    APPROVED = "approved",
    COMPLETED = "completed",
    PROJECT_APPROVED = "project_approved",
    PROJECT_COMPLETED = "project_completed",
    PROJECT_PENDING = "project_pending",
    AFFILIATION_INVITED = "affiliation_invited",
    AFFILIATION_PENDING = "affiliation_pending",
    AFFILIATION_APPROVED = "affiliation_approved",
    AFFILIATION_REJECTED = "affiliation_rejected"
}
interface ChipStatusProps extends ChipProps {
    status: Status | undefined;
}
export default function ChipStatus({ status, ...restProps }: ChipStatusProps): import("react/jsx-runtime").JSX.Element;
export {};
