// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import keycloak from '@/utils/keycloak';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async () => {
    try {
      const authenticated = await keycloak.init({ onLoad: 'login-required' });
      if (authenticated) {
        setIsAuthenticated(true);
        setToken(keycloak.token || null);
        setCookie('access_token', keycloak.token, { secure: true, sameSite: 'strict' });
        fetchUserInfo();
      }
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
    }
  };

  const logout = () => {
    keycloak.logout();
    deleteCookie('access_token');
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    // Check if a token is stored in the cookie on mount
    const storedToken = getCookie('access_token') as string | null;
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      keycloak.token = storedToken;
      fetchUserInfo();
    }
  }, []);

  return { isAuthenticated, login, logout, token, user };
};
