import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  ModalProps,
  useTheme,
} from "@mui/material";

export interface FormModalProps extends ModalProps {
  isDismissable?: boolean;
  onBack?: () => void;
}

export default function FormModal({
  children,
  isDismissable = true,
  onBack,
  onClose,
  sx,
  ...restProps
}: FormModalProps) {
  const theme = useTheme();

  return (
    <Modal onClose={onClose} {...restProps}>
      <Card
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          overflowY: "scroll",
          maxHeight: `calc(100vh - ${theme.spacing(4)})`,
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
          {children}
        </CardContent>
      </Card>
    </Modal>
  );
}
