import dayjs from "dayjs";

function isExpired(date: string) {
  const expirationTime = dayjs(date);

  return expirationTime.isAfter(dayjs());
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

export { isExpired, isExpiredInvite };
