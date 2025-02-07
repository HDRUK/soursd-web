import { PageBody, PageSection } from "@/modules";
import AccountConfirm from "./components/AccountConfirm";

async function Page() {
  return (
    <PageBody>
      <PageSection sx={{ flexGrow: 1 }}>
        <AccountConfirm />
      </PageSection>
    </PageBody>
  );
}

export default Page;
