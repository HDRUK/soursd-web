import { ROUTES } from "@/consts/router";
import { Routes } from "@/types/router";

export interface ConfigProps {
  config: {
    routes: Routes;
  };
}

export default function withConfig<T>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    return (
      <WrappedComponent
        {...(props as T & JSX.IntrinsicAttributes)}
        config={{ routes: ROUTES }}
      />
    );
  };
}
