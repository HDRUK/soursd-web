import { Routes } from "@/types/router";
export interface ConfigProps {
    config: {
        routes: Routes;
    };
}
export default function withConfig<T>(WrappedComponent: React.ComponentType<T>): (props: T) => import("react/jsx-runtime").JSX.Element;
