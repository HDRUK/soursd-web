import DecoratorPage from "@/modules/DecoratorPage";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";
import { withAuth } from "@/components/Auth";

interface PageProps {
  params: { orgId: string };
}

function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.orgId} type={EntityType.organisation} />
    </DecoratorPage>
  );
}

export default withAuth(Page);
