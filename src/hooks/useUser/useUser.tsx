import { getAuthData } from "@/utils/auth";
import { useEffect, useState } from "react";
import { User } from "@/types/application";

export default function useUser() {
  const [user, setAuth] = useState<User | undefined>();

  useEffect(() => {
    getAuthData().then(auth => {
      setAuth(auth.user);
    });
  }, []);

  return user;
}
