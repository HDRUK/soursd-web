import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function DetailsLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.DETAILS }}>{children}</Layout>;
}

export default DetailsLayout;
