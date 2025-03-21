import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function AffiliationsLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.AFFILIATIONS }}>{children}</Layout>;
}

export default AffiliationsLayout;
