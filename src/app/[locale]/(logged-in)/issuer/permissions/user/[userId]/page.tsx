import { withAuth } from "@/components/Auth";
import PageContainer from "@/modules/PageContainer";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";

interface PageProps {
  params: { userId: string };
}

function Page({ params }: PageProps) {
  return (
    <PageContainer>
      <Sections userId={+params.userId} type={EntityType.RESEARCHER} />
    </PageContainer>
  );
}

export default withAuth(Page);
