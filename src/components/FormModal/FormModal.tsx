import { Card, CardContent, Modal, ModalProps, useTheme } from "@mui/material";

interface FormModalProps extends ModalProps {}

export default function FormModal({ children, ...restProps }: FormModalProps) {
  const theme = useTheme();

  return (
    <Modal {...restProps}>
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
        <CardContent sx={{ p: 4 }}>{children}</CardContent>
      </Card>
    </Modal>
  );
}
