import { Close } from "@mui/icons-material";
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
}

export default function FormModal({
  children,
  isDismissable = true,
  onClose = () => {},
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
          [theme.breakpoints.down("sm")]: {
            width: `calc(100% - ${theme.spacing(4)})`,
          },
        }}>
        <CardContent sx={{ p: 4 }}>
          {isDismissable && (
            <Box sx={{ position: "absolute", top: 5, right: 5 }}>
              <span>
                <IconButton onClick={e => onClose(e, "escapeKeyDown")}>
                  <Close />
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
