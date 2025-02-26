"use client";

import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { PropsWithChildren, useMemo } from "react";

export type CacheProviderProps = PropsWithChildren<{
  options: OptionsOfCreateCache;
}>;

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export default function EmotionCache({
  options,
  children,
}: CacheProviderProps) {
  const cache = useMemo(() => createCache(options), [options]);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
