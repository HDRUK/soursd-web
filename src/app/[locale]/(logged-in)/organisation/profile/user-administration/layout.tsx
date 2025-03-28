import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function UserAdminLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.USER_ADMINISTRATION }}>{children}</Layout>;
}

export default UserAdminLayout;
