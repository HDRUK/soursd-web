import NavBar from "@/components/NavBar";
import { Footer } from "@/modules";
import SoursdInfo from "./components/SoursdInfo";
import { StyledWrapper } from "./homepage.styles";
import SoursdUsages from "./components/SoursdUsages";
import KeyFeatures from "./components/KeyFeatures";
import Support from "./components/Support";
import HomepageImages from "./components/HomepageImages";

export default function Page() {
  return (
    <>
      <NavBar />
      <StyledWrapper>
        <section>
          <SoursdInfo />
        </section>
        <section>
          <SoursdUsages />
        </section>
        <section>
          <KeyFeatures />
        </section>
        <section>
          <Support />
        </section>
        <section>
          <HomepageImages />
        </section>
      </StyledWrapper>
      <Footer />
    </>
  );
}
