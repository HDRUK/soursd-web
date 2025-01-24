"use client";

import { useStore } from "@/data/store";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  CircularProgress,
} from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  getNotifications,
  getNotificationsCounts,
  patchUserNotification,
} from "@/services/notifications";
import { NotificationPatchType } from "@/services/notifications/patchUserNotification";
import { NotificationModal } from "@/modules/NotifcationModal";
import { Notification } from "@/types/notifications";
import { formatNotificationType } from "@/utils/notifications";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { StyledMenuItem } from "./NotificationsMenu.styles";

const NAMESPACE_TRANSLATIONS = "NotificationsMenu";

const PER_PAGE = 5;

export default function NotificationsMenu() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const user = useStore(store => store.getUser());
  const [showNotificationModel, setShowNotificationModal] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<Notification>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: notificationsCount, refetch: refetchCount } = useQuery({
    queryKey: ["getNotificationsCounts", user?.id],
    queryFn: ({ queryKey }) =>
      getNotificationsCounts(queryKey[1] as number, {
        error: {
          message: "getNotificationsCountsError",
        },
      }),
    enabled: true,
    refetchInterval: 10000,
  });

  const {
    data: notificationsData,
    refetch: refetchNotifications,
    fetchNextPage: fetchNextPageNotifications,
    hasNextPage: hasNextPageNotifications,
    isFetching: isFetchingNotifications,
    isFetchingNextPage: isFetchingNextPageNotifications,
  } = useInfiniteQuery({
    queryKey: ["getUserNotifications", user?.id],
    queryFn: ({ pageParam }) =>
      getNotifications(
        user?.id as number,
        { page: pageParam, per_page: PER_PAGE },
        {
          error: {
            message: "getNotificationsError",
          },
        }
      ),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { last_page, current_page } = lastPage.data;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!notificationsCount?.data.total) return;
    // if the polled total count changes, refetch the notification data
    refetchNotifications();
  }, [notificationsCount?.data.total]);

  const { mutateAsync: mutateUpdateAsync } = useMutation({
    mutationKey: ["patchUserNotifications"],
    mutationFn: ({
      notificationId,
      type,
    }: {
      notificationId: string;
      type: NotificationPatchType;
    }) =>
      patchUserNotification(user?.id as number, notificationId, type, {
        suppressThrow: true,
        error: {
          message: "patchNotificationError",
        },
      }),
  });
  const notifications =
    notificationsData?.pages.flatMap(page => page.data.data) || [];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = (notificationId: string) => {
    mutateUpdateAsync({
      notificationId,
      type: NotificationPatchType.READ,
    }).then(() => {
      refetchNotifications();
      refetchCount();
    });
  };

  const handleViewNotification = (notif: Notification) => {
    if (!notif.read_at) markAsRead(notif.id);
    setCurrentNotification(notif);
    setShowNotificationModal(true);
  };

  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const [debouncedIsNearBottom, setDebouncedIsNearBottom] = useDebounce(
    isNearBottom,
    2000
  );

  useEffect(() => {
    if (
      debouncedIsNearBottom &&
      notifications.length < (notificationsCount?.data.total ?? 0)
    ) {
      fetchNextPageNotifications();
      setDebouncedIsNearBottom(false);
    }
  }, [debouncedIsNearBottom]);

  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    useState<boolean>(false);

  useEffect(() => {
    if (!hasNextPageNotifications) {
      setIsLoadingMoreNotifications(false);
      return;
    }

    if (
      isFetchingNotifications ||
      isFetchingNextPageNotifications ||
      (isNearBottom && !debouncedIsNearBottom)
    ) {
      setIsLoadingMoreNotifications(true);
    }
  }, [
    hasNextPageNotifications,
    isFetchingNotifications,
    isFetchingNextPageNotifications,
    isNearBottom,
    debouncedIsNearBottom,
  ]);

  return (
    <Box>
      <IconButton
        color="primary"
        onClick={handleOpen}
        sx={{
          height: "30px",
          width: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}>
        <Badge badgeContent={notificationsCount?.data.unread} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { width: "350px", maxHeight: "300px" },
            onScroll: (event: React.UIEvent<HTMLDivElement>) => {
              event.persist();
              const target = event.currentTarget;
              const { scrollTop, scrollHeight, clientHeight } = target;
              const isNearBottom = scrollTop + clientHeight >= scrollHeight - 5;
              setIsNearBottom(isNearBottom);
            },
          },
        }}>
        {notificationsCount?.data.total === 0 ? (
          <MenuItem disabled>
            <Typography>{t("noNotifications")}</Typography>
          </MenuItem>
        ) : (
          notifications.map(notif => (
            <StyledMenuItem
              key={notif.id}
              onClick={() => handleViewNotification(notif)}
              className={notif.read_at ? "read" : "unread"}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: "inherit" }}>
                {formatNotificationType(notif.type)}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
                {notif.data.message}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: "inherit" }}>
                {dayjs(notif.data.time).format("MMM D, YYYY • h:mm A")}
              </Typography>
            </StyledMenuItem>
          ))
        )}

        {isLoadingMoreNotifications && (
          <StyledMenuItem>
            <CircularProgress sx={{ mx: "auto" }} />
          </StyledMenuItem>
        )}
      </Menu>

      {currentNotification && (
        <NotificationModal
          open={showNotificationModel}
          onClose={() => setShowNotificationModal(false)}
          notification={currentNotification}
        />
      )}
    </Box>
  );
}
