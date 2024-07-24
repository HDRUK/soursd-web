import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";

interface PageProps {
  params: { userId: string };
}

function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.userId} type={EntityType.RESEARCHER} />
    </DecoratorPage>
  );
}

export default withAuth(Page);
