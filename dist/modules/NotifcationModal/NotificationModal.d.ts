import { ModalProps } from "@mui/material";
import { Notification } from "@/types/notifications";
export interface FormModalProps extends Omit<ModalProps, "children"> {
    notification: Notification;
    onClose: (event: React.SyntheticEvent, reason: string) => void;
    handleMarkAsUnread: () => void;
    isLoading?: boolean;
    onBack?: () => void;
}
export default function NotificationModal({ notification, isLoading, onClose, handleMarkAsUnread, onBack, sx, ...restProps }: FormModalProps): import("react/jsx-runtime").JSX.Element;
