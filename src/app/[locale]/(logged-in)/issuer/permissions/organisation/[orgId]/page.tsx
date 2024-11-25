import { withAuth } from "@/components/Auth";
import PageContainer from "@/modules/PageContainer";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";

interface PageProps {
  params: { orgId: string };
}

function Page({ params }: PageProps) {
  return (
    <PageContainer>
      <Sections userId={+params.orgId} type={EntityType.ORGANISATION} />
    </PageContainer>
  );
}

export default withAuth(Page);
