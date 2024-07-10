import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import Sections from "./components/Sections";

interface PageProps {
  params: { userId: string };
}

function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.userId} />
    </DecoratorPage>
  );
}

export default withAuth(Page);
