import NavBar from "../components/NavBar";
import SectionHighlights from "./components/SectionHighlights";
import SectionInformation from "./components/SectionInformation";

export default function Homepage() {
  return (
    <>
      <NavBar />
      <section>
        <SectionHighlights />
      </section>
      <section>
        <SectionInformation />
      </section>
    </>
  );
}
