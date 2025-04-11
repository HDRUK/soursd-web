import { useMutation } from "@tanstack/react-query";
import patchReadRequestNotificationQuery from "@/services/notifications/patchReadRequestNotificationQuery";

const usePatchReadRequest = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: number;
      status: number;
    }) => {
      return patchReadRequestNotificationQuery(requestId, status, {});
    },
  });
};

export default usePatchReadRequest;
