"use client";

// contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import keycloak from "@/utils/keycloak";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface User {
  sub: string;
  name: string;
  email: string;
  preferred_username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  token: string | null;
  user: User | null;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: async () => {
    console.warn("login function not initialized");
  },
  logout: () => {
    console.warn("logout function not initialized");
  },
  token: null,
  user: null,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      const authenticated = await keycloak.init({ onLoad: "login-required" });
      if (authenticated) {
        setIsAuthenticated(true);
        const accessToken = keycloak.token || "";
        setToken(accessToken);
        setCookie("access_token", accessToken, {
          secure: true,
          sameSite: "strict",
        });
        fetchUserInfo(accessToken);
      }
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
    }
  };

  const logout = () => {
    keycloak.logout();
    deleteCookie("access_token");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    // Restore token from cookies on app load
    const storedToken = getCookie("access_token") as string | null;
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      keycloak.token = storedToken;
      fetchUserInfo(storedToken);
    }
  }, []);

  const authContextValue = useMemo(
    () => ({ isAuthenticated, login, logout, token, user }),
    [isAuthenticated, login, logout, token, user]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
