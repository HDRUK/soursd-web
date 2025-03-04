import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ContactsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.CONTACTS,
      }}
    />
  );
}

export default ContactsPage;
