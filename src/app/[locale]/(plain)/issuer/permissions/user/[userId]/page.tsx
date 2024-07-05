import DecoratorPage from "@/modules/DecoratorPage";
import Sections from "./components/Sections";

interface PageProps {
  params: { userId: string };
}

export default function Page({ params }: PageProps) {
  return (
    <DecoratorPage>
      <Sections userId={+params.userId} />
    </DecoratorPage>
  );
}
