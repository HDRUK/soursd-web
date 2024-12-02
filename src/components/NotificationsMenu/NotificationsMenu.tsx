"use client";

import { useCookies } from "@/context/CookieContext/CookieContext";
import { useStore } from "@/data/store";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { getUser } from "@/services/users";
import { parseValidJSON } from "@/utils/json";
import { showAlert } from "@/utils/showAlert";
import { isOrcIdCompleted, isOrcIdScanning } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Swal from "sweetalert2";

const NAMESPACE_TRANSLATIONS = "NotificationsMenu";

export default function NotificationsMenu() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { getCookie, setCookie } = useCookies();
  const user = useStore(store => store.getUser());

  const messages = parseValidJSON(getCookie("messages") || "{}");

  const { data: userData } = useQuery({
    queryKey: ["getUserOrcIdStatus", user?.id],
    queryFn: ({ queryKey }) => getUser(queryKey[1]),
    enabled: !messages.orcIdCompleted && !!user?.id,
  });

  const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
    options: { queryKey: ["getUserOrcIdStatus", user?.id] },
  });

  useEffect(() => {
    if (userData?.data) {
      if (isOrcIdScanning(userData.data)) {
        refetchUser();
      } else {
        refetchCancel();

        if (isOrcIdCompleted(userData.data) && !messages.orcIdCompleted) {
          showAlert(
            "success",
            t("orcIdSuccessDescription"),
            t("orcIdSuccessTitle")
          );

          setCookie(
            "messages",
            JSON.stringify({
              ...messages,
              orcIdCompleted: dayjs().toISOString(),
            })
          );
        }
      }
    }

    return () => refetchCancel();
  }, [messages, userData?.data]);

  // In the absence of design, alerts will temporarily be fired (swal)
  return null;
}
