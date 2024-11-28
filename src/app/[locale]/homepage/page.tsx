"use server";

import { Footer, Header } from "@/modules";
import KeyFeatures from "./components/KeyFeatures";
import SoursdInfo from "./components/SoursdInfo";
import SoursdUsages from "./components/SoursdUsages";
import Support from "./components/Support";
import { StyledWrapper } from "./homepage.styles";

export default async function Page() {
  return (
    <>
      <Header />
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
      </StyledWrapper>
      <Footer />
    </>
  );
}
