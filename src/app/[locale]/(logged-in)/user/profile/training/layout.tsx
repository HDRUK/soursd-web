import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function TrainingLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.TRAINING }}>{children}</Layout>;
}

export default TrainingLayout;
