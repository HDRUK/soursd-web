import { QueryOptions } from "@/types/requests";
import putActionLog from "./putActionLog";

export default function putActionLogQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putActionLog"],
    mutationFn: (id: number) => {
      return putActionLog(id, {
        error: { message: "putActionLogError" },
      });
    },
  };
}
