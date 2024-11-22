"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie"; // Client-side cookies

type CookieContextType = {
  getCookie: (name: string) => string | undefined;
  setCookie: (
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ) => void;
  removeCookie: (name: string) => void;
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const cookieKeys = Object.keys(Cookies.get());
    const cookieValues = cookieKeys.reduce(
      (acc, key) => {
        acc[key] = Cookies.get(key) || "";
        return acc;
      },
      {} as { [key: string]: string }
    );
    setCookies(cookieValues);
  }, []);

  const getCookie = (name: string) => cookies[name];

  const setCookie = (
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ) => {
    Cookies.set(name, value, options);
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const removeCookie = (name: string) => {
    Cookies.remove(name);
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      getCookie,
      setCookie,
      removeCookie,
    }),
    [cookies]
  );

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
};

// Custom hook to use the cookie context
export const useCookies = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookies must be used within a CookieProvider");
  }
  return context;
};
