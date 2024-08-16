import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Modal,
  ModalProps,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

export interface FormModalProps extends Omit<ModalProps, "children"> {
  children: ReactNode;
  variant?: "form" | "content";
  isLoading?: boolean;
  isDismissable?: boolean;
  onBack?: () => void;
}

export default function FormModal({
  children,
  isDismissable = true,
  isLoading,
  variant = "form",
  onBack,
  onClose,
  sx,
  ...restProps
}: FormModalProps) {
  const theme = useTheme();

  return (
    <Modal data-testid="form-modal" onClose={onClose} {...restProps}>
      <Card
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          overflowY: "scroll",
          maxHeight: `calc(100vh - ${theme.spacing(4)})`,
          minWidth: variant === "form" ? "250px" : "600px",
          [theme.breakpoints.down("sm")]: {
            width: `calc(100% - ${theme.spacing(4)})`,
          },
          ...sx,
        }}>
        <CardContent sx={{ p: 4 }}>
          {onBack && (
            <Box sx={{ position: "absolute", top: 5, left: 5 }}>
              <span>
                <IconButton onClick={onBack}>
                  <ChevronLeftIcon />
                </IconButton>
              </span>
            </Box>
          )}
          {isDismissable && onClose && (
            <Box sx={{ position: "absolute", top: 5, right: 5 }}>
              <span>
                <IconButton onClick={e => onClose(e, "escapeKeyDown")}>
                  <CloseIcon />
                </IconButton>
              </span>
            </Box>
          )}
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CircularProgress />
            </Box>
          )}
          {children}
        </CardContent>
      </Card>
    </Modal>
  );
}
