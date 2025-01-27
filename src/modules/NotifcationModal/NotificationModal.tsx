import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Modal,
  ModalProps,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { Notification } from "@/types/notifications";
import dayjs from "dayjs";
import { formatNotificationType } from "@/utils/notifications";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "NotificationsModal";

export interface FormModalProps extends Omit<ModalProps, "children"> {
  notification: Notification;
  onClose: (event: React.SyntheticEvent, reason: string) => void;
  handleMarkAsUnread: () => void;
  isLoading?: boolean;
  onBack?: () => void;
}

export default function NotificationModal({
  notification,
  isLoading,
  onClose,
  handleMarkAsUnread,
  onBack,
  sx,
  ...restProps
}: FormModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const theme = useTheme();
  const mobileMediaQuery = theme.breakpoints.down("sm");

  return (
    <Modal
      data-testid="notification-modal"
      onClose={onClose}
      sx={{ p: 1 }}
      {...restProps}>
      <Card
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          overflowY: "scroll",
          maxHeight: `calc(100vh - ${theme.spacing(4)})`,
          minWidth: "600px",
          [mobileMediaQuery]: {
            width: `calc(100% - ${theme.spacing(2)})`,
            minWidth: "auto",
          },
          ...sx,
        }}>
        <CardHeader
          data-testid="notification-modal-header"
          title={notification?.data.message}
          subheader={
            <span>
              {" "}
              {formatNotificationType(notification.type)}
              {" - "}
              {dayjs(notification.data.time).format(
                "MMM D, YYYY • h:mm A"
              )}{" "}
            </span>
          }
        />
        <CardContent
          sx={{
            mt: 0,
            pt: 0,
            px: 4,
            [mobileMediaQuery]: {
              px: 2,
            },
          }}>
          {onBack && (
            <Box sx={{ position: "absolute", top: 5, left: 5 }}>
              <span>
                <IconButton onClick={onBack}>
                  <ChevronLeftIcon />
                </IconButton>
              </span>
            </Box>
          )}
          <Box sx={{ position: "absolute", top: 5, right: 5 }}>
            <span>
              <Tooltip title={t("toolTipMarkAsUnread")}>
                <IconButton
                  onClick={handleMarkAsUnread}
                  data-testid="mark-notification-as-unread-button">
                  <MarkEmailUnreadIcon />
                </IconButton>
              </Tooltip>
              <IconButton onClick={e => onClose(e, "escapeKeyDown")}>
                <CloseIcon />
              </IconButton>
            </span>
          </Box>

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

          <TableContainer
            component={Paper}
            sx={{ marginTop: 0, width: "100%" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("col1")}</TableCell>
                  <TableCell align="right">{t("col2")}</TableCell>
                  <TableCell align="right">{t("col3")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(notification.data.details).map(
                  ([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell align="right">{value.old}</TableCell>
                      <TableCell align="right">{value.new}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Modal>
  );
}
