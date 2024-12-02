import { getMe } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  const { data, error } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => {
      return getMe({
        error: {
          message: "getMe",
        },
      });
    },
  });
  console.log(error);

  return data;
}
