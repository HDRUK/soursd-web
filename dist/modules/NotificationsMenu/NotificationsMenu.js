"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationsMenu;
var jsx_runtime_1 = require("react/jsx-runtime");
var store_1 = require("@/data/store");
var material_1 = require("@mui/material");
var date_1 = require("@/utils/date");
var next_intl_1 = require("next-intl");
var NotificationsOutlined_1 = __importDefault(require("@mui/icons-material/NotificationsOutlined"));
var NotificationsActiveOutlined_1 = __importDefault(require("@mui/icons-material/NotificationsActiveOutlined"));
var types_1 = require("@/services/notifications/types");
var NotifcationModal_1 = __importDefault(require("@/modules/NotifcationModal"));
var notifications_1 = require("@/utils/notifications");
var react_1 = require("react");
var useDebounce_1 = __importDefault(require("@/hooks/useDebounce"));
var usePatchNotification_1 = __importDefault(require("./hooks/usePatchNotification"));
var useGetNotifications_1 = __importDefault(require("./hooks/useGetNotifications"));
var useGetNotificationCounts_1 = __importDefault(require("./hooks/useGetNotificationCounts"));
var NotificationsMenu_styles_1 = require("./NotificationsMenu.styles");
var NAMESPACE_TRANSLATIONS = "NotificationsMenu";
function NotificationsMenu() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS);
    var user = (0, store_1.useStore)(function (store) { return store.getUser(); });
    var _a = (0, react_1.useState)(false), showNotificationModel = _a[0], setShowNotificationModal = _a[1];
    var _b = (0, react_1.useState)(), currentNotification = _b[0], setCurrentNotification = _b[1];
    var _c = (0, react_1.useState)(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var open = Boolean(anchorEl);
    var _d = (0, useGetNotificationCounts_1.default)(user === null || user === void 0 ? void 0 : user.id), notificationsCount = _d.data, refetchCount = _d.refetch;
    var _e = (0, useGetNotifications_1.default)(user === null || user === void 0 ? void 0 : user.id), notificationsData = _e.data, refetchNotifications = _e.refetch, fetchNextPageNotifications = _e.fetchNextPage, hasNextPageNotifications = _e.hasNextPage, isFetchingNotifications = _e.isFetching, isFetchingNextPageNotifications = _e.isFetchingNextPage;
    var isFirstLoad = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(function () {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        if (!(notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.total))
            return;
        // if the polled total count changes, refetch the notification data
        refetchNotifications();
    }, [notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data]);
    var mutateNotification = (0, usePatchNotification_1.default)(user === null || user === void 0 ? void 0 : user.id).mutateAsync;
    var notifications = (notificationsData === null || notificationsData === void 0 ? void 0 : notificationsData.pages.flatMap(function (page) { return page.data.data; })) || [];
    var handleOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var changeReadStatus = function (notificationId, type) {
        mutateNotification({
            notificationId: notificationId,
            type: type,
        }).then(function () {
            refetchNotifications();
            refetchCount();
        });
    };
    var handleViewNotification = function (notif) {
        if (!notif.read_at)
            changeReadStatus(notif.id, types_1.NotificationPatchType.READ);
        setCurrentNotification(notif);
        setShowNotificationModal(true);
    };
    var _f = (0, react_1.useState)(false), isNearBottom = _f[0], setIsNearBottom = _f[1];
    var _g = (0, useDebounce_1.default)(isNearBottom, 500), debouncedIsNearBottom = _g[0], setDebouncedIsNearBottom = _g[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (debouncedIsNearBottom &&
            notifications.length < ((_a = notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.total) !== null && _a !== void 0 ? _a : 0)) {
            fetchNextPageNotifications();
            setDebouncedIsNearBottom(false);
        }
    }, [debouncedIsNearBottom]);
    var _h = (0, react_1.useState)(false), isLoadingMoreNotifications = _h[0], setIsLoadingMoreNotifications = _h[1];
    (0, react_1.useEffect)(function () {
        if (!hasNextPageNotifications) {
            setIsLoadingMoreNotifications(false);
            return;
        }
        if (isFetchingNotifications ||
            isFetchingNextPageNotifications ||
            (isNearBottom && !debouncedIsNearBottom)) {
            setIsLoadingMoreNotifications(true);
        }
    }, [
        hasNextPageNotifications,
        isFetchingNotifications,
        isFetchingNextPageNotifications,
        isNearBottom,
        debouncedIsNearBottom,
    ]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, { "data-testid": "notifications-button", color: (notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.unread)
                    ? "notificationActive"
                    : "notification", onClick: handleOpen, sx: {
                    height: "30px",
                    width: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                }, children: (0, jsx_runtime_1.jsx)(material_1.Badge, { "data-testid": "notifications-badge", badgeContent: notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.unread, color: "error", children: (notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.unread) ? ((0, jsx_runtime_1.jsx)(NotificationsActiveOutlined_1.default, {})) : ((0, jsx_runtime_1.jsx)(NotificationsOutlined_1.default, {})) }) }), (0, jsx_runtime_1.jsxs)(material_1.Menu, { "data-testid": "notifications-menu", anchorEl: anchorEl, open: open, onClose: handleClose, slotProps: {
                    paper: {
                        sx: { width: "auto", maxHeight: "300px" },
                        onScroll: function (event) {
                            event.persist();
                            var target = event.currentTarget;
                            var scrollTop = target.scrollTop, scrollHeight = target.scrollHeight, clientHeight = target.clientHeight;
                            var isNearBottom = scrollTop + clientHeight >= scrollHeight - 5;
                            setIsNearBottom(isNearBottom);
                        },
                    },
                }, children: [(notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.data.total) === 0 ? ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { disabled: true, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: t("noNotifications") }) })) : (notifications.map(function (notif) { return ((0, jsx_runtime_1.jsxs)(NotificationsMenu_styles_1.StyledMenuItem, { "data-testid": "notification-item", onClick: function () { return handleViewNotification(notif); }, className: notif.read_at ? "read" : "unread", children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: "inherit" }, children: (0, notifications_1.formatNotificationType)(notif.type) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", sx: { fontWeight: "inherit" }, children: notif.data.message }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: "inherit" }, children: (0, date_1.formatDBDate)(notif.data.time) })] }, notif.id)); })), isLoadingMoreNotifications && ((0, jsx_runtime_1.jsx)(NotificationsMenu_styles_1.StyledMenuItem, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: { mx: "auto" } }) }))] }), currentNotification && ((0, jsx_runtime_1.jsx)(NotifcationModal_1.default, { open: showNotificationModel, handleMarkAsUnread: function () {
                    changeReadStatus(currentNotification.id, types_1.NotificationPatchType.UNREAD);
                    setShowNotificationModal(false);
                }, onClose: function () { return setShowNotificationModal(false); }, notification: currentNotification }))] }));
}
