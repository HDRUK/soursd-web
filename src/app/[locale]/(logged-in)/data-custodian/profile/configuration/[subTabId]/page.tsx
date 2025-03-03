import SubPage from "../../components/SubPage";
import { ConfigurationSubTabs, PageTabs } from "../../consts/tabs";

interface ConfigurationPageProps {
  params: {
    subTabId: ConfigurationSubTabs;
  };
}

function ConfigurationPage({ params: { subTabId } }: ConfigurationPageProps) {
  return (
    <SubPage
      params={{
        tabId: PageTabs.CONFIGURATION,
        subTabId,
      }}
    />
  );
}

export default ConfigurationPage;
