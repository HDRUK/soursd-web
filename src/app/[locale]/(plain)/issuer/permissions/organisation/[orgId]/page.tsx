import DecoratorPage from "@/modules/DecoratorPage";
import { EntityType } from "@/types/api";
import Sections from "../../components/Sections";

interface PageProps {
  params: { orgId: string };
}

export default function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.orgId} type={EntityType.organisation} />
    </DecoratorPage>
  );
}
