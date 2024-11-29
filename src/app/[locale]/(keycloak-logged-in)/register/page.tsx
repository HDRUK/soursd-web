import { withConfig } from "@/components/Config";
import PageContainer from "@/modules/PageContainer";
import PageSection from "@/modules/PageSection";
import AccountConfirm from "./components/AccountConfirm";

function Page() {
  return (
    <PageContainer>
      <PageSection sx={{ flexGrow: 1 }}>
        <AccountConfirm />
      </PageSection>
    </PageContainer>
  );
}

export default withConfig(Page);
