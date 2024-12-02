import { getMe } from "@/utils/auth";
import { useEffect, useState } from "react";
import { User } from "@/types/application";

export default function useUser() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getMe().then(user => {
      setUser(user);
    });
  }, []);

  return user;
}
