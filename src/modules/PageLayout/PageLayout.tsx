import { HTMLAttributes, PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PageLayout({
  children,
  ...restProps
}: PageLayoutProps) {
  return <div {...restProps}>{children}</div>;
}
