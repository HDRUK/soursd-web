import { User } from "@/services/auth/types";
import { getAuthData } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getAuthData().then(auth => {
      setUser(auth.user);
    });
  }, []);

  return user;
}
