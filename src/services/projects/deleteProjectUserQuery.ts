import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProjectUser from "./deleteProjectUser";
import { DeleteProjectUserPayload } from "./types";

export default function deleteProjectUserQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteProjectUser", ...(options?.mutationKeySuffix || [])],
    mutationFn: (payload: DeleteProjectUserPayload) => {
      console.log("******** delete payload", payload);
      return deleteProjectUser(payload.projectId, payload.userDigitalIdent, {
        error: { message: "deleteProjectUser" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteProjectUser>>,
    Error,
    DeleteProjectUserPayload
  >;
}
