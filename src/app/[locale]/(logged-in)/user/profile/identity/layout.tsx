import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function IdentityLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.IDENTITY }}>{children}</Layout>;
}

export default IdentityLayout;
