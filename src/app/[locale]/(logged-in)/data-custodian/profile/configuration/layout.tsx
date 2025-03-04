import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function ConfigurationLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.CONFIGURATION }}>{children}</Layout>;
}

export default ConfigurationLayout;
