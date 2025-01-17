import {
  FORMAT_DATE_DB,
  FORMAT_DISPLAY_SHORT_DATE,
  FORMAT_SHORT_DATE,
} from "@/consts/date";
import dayjs from "dayjs";

function isExpired(date: string) {
  const expirationTime = dayjs(date);

  return expirationTime.isAfter(dayjs());
}

function formatShortDate(date?: string) {
  return dayjs(date).format(FORMAT_SHORT_DATE);
}

function formatDisplayShortDate(date?: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format(FORMAT_DISPLAY_SHORT_DATE) : date;
}

function formatNowDBDate() {
  return dayjs().format(FORMAT_DATE_DB);
}

function formatDBDate(date?: string) {
  return dayjs(date).format(FORMAT_DATE_DB);
}

function isExpiredInvite(invite_sent_at?: string) {
  return (
    invite_sent_at &&
    isExpired(
      dayjs(invite_sent_at)
        .add(+(process.env.NEXT_PUBLIC_INVITE_TIME_HOURS || 1), "hour")
        .format()
    )
  );
}

export {
  isExpired,
  isExpiredInvite,
  formatShortDate,
  formatNowDBDate,
  formatDisplayShortDate,
  formatDBDate,
};
