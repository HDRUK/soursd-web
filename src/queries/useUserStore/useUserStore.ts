import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserQuery } from "../../services/users";

export default function useUserStore() {
  const [user, setUser] = useStore(state => [state.getUser(), state.setUser]);
  const { data: userData } = useQuery(getUserQuery(user?.id as number));

  useEffect(() => {
    if (userData?.data) setUser(userData.data);
  }, [userData?.data]);

  return user;
}
