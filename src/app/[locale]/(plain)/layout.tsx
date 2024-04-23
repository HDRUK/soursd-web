import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<object>;

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
