import { Footer, Header } from "@/modules";
import CookiePolicy from "./components/CookiePolicy";

export default function Page() {
  return (
    <>
      <Header />
      <CookiePolicy />
      <Footer />
    </>
  );
}
