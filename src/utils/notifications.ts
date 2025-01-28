export const formatNotificationType = (type: string): string => {
  return (
    type
      .split("\\")
      .pop()
      ?.replace(/([A-Z])/g, " $1")
      .trim() || "Notification"
  );
};
