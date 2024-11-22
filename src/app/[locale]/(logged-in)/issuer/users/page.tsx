import { withAuth } from "@/components/Auth";
import PageContainer from "@/modules/PageContainer";
import Sections from "./components/Sections";

function Page() {
  return (
    <PageContainer>
      <Sections />
    </PageContainer>
  );
}

export default withAuth(Page);
