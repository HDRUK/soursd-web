import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";

const useEmailExists = (email: string) => {
  return useQuery({
    queryKey: ["getUsersByEmail", email],
    queryFn: () => getUsers({ email }),
    enabled: !!email,
    select: data => data.data.data.length > 0,
  });
};

export default useEmailExists;
