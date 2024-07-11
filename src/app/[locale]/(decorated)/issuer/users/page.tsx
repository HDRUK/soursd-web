import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import Sections from "./components/Sections";

function Page() {
  return (
    <DecoratorPage>
      <Sections />
    </DecoratorPage>
  );
}

export default Page;
