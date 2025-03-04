import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function ContactsLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.CONTACTS }}>{children}</Layout>;
}

export default ContactsLayout;
