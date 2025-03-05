import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function ExperienceLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.EXPERIENCE }}>{children}</Layout>;
}

export default ExperienceLayout;
