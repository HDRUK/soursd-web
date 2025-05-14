import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import { PropsWithChildren } from "react";
export type CacheProviderProps = PropsWithChildren<{
    options: OptionsOfCreateCache;
}>;
export default function EmotionCache({ options, children, }: CacheProviderProps): import("react/jsx-runtime").JSX.Element;
