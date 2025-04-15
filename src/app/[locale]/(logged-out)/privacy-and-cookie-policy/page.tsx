import { Footer, Header } from "@/modules";
import PrivaryPolicy from "./components/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy";

export default function Page() {
  return (
    <>
      <Header />
      <section>
        <PrivaryPolicy />
      </section>
      <section>
        <CookiePolicy />
      </section>
      <Footer />
    </>
  );
}
