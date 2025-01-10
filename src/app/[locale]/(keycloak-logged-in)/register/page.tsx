import { withConfig } from "@/components/Config";
import PageContainer from "@/modules/PageContainer";
import PageSection from "@/modules/PageSection";
import { convertJwtToJSON } from "@/utils/json";
import { cookies } from "next/headers";
import AccountConfirm from "./components/AccountConfirm";

async function Page() {
  const cookieStore = await cookies();
  const token = convertJwtToJSON(
    cookieStore.get("access_token")?.value || "{}"
  );

  return (
    <PageContainer>
      <PageSection sx={{ flexGrow: 1 }}>
        <AccountConfirm email={token?.email} />
      </PageSection>
    </PageContainer>
  );
}

export default withConfig(Page);
