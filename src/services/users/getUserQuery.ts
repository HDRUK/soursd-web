import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import getUser from "./getUser";

export default function getUserQuery(userId: number) {
  return {
    queryKey: ["getUser", userId],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUser(id as number, {
        error: {
          message: "getUserError",
        },
      });
    },
  };
}
