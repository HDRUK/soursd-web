import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";

interface PageProps {
  params: { orgId: string };
}

function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.orgId} type={EntityType.ORGANISATION} />
    </DecoratorPage>
  );
}

export default withAuth(Page);
