import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { User } from "@/types/application";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  userData: User;
  params: {
    subTabId: UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPageUsers({ userData, params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tabId = PageTabs.USERS;

  const [user, setUser] = useStore(state => [
    state.getCurrentUser(),
    state.setCurrentUser,
  ]);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    user && (
      <PageBodyContainer heading={t(toCamelCase(tabId))}>
        <PageColumns>
          <PageColumnBody>
            <SubTabsSections tabId={tabId} {...params} />
            <SubTabsContents tabId={tabId} {...params} />
          </PageColumnBody>
          <PageColumnDetails>Placeholder</PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}

export default SubPageUsers;
