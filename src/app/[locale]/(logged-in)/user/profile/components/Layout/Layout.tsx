import { ReactNode } from "react";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

async function Layout({ children, params: { tabId } }: LayoutProps) {
  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore
  //   .getAll()
  //   .map(cookie => `${cookie.name}=${cookie.value}`)
  //   .join("; ");

  // console.log("cookieHeader");
  // console.log(cookieHeader);
  // await handleApplicationRedirects();

  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default Layout;
