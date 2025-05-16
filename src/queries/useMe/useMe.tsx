import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/auth";

export default function useMe() {
  const query = useQuery({
    queryKey: ["getMe"],
    queryFn: () => {
      return getMe({
        error: {
          message: "getMe",
        },
      });
    },
  });

  return query;
}
