import { useMutation } from "@tanstack/react-query";
import patchReadRequestNotificationQuery from "@/services/notifications/patchReadRequestNotificationQuery";


const usePatchReadRequest = (requestId: number, status: number) =>
  useMutation(patchReadRequestNotificationQuery(requestId, status, {}));

export default usePatchReadRequest;