import { getMe } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  const { data, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => {
      return getMe({
        error: {
          message: "getMe",
        },
      });
    },
  });
  const userData = !isError ? data?.data : null;

  return userData;
}
