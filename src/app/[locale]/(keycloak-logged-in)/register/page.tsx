import PageContainer from "@/modules/PageContainer";
import PageSection from "@/modules/PageSection";
import AccountConfirm from "./components/AccountConfirm";

async function Page() {
  return (
    <PageContainer>
      <PageSection sx={{ flexGrow: 1 }}>
        <AccountConfirm />
      </PageSection>
    </PageContainer>
  );
}

export default Page;
