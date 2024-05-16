import SectionHighlights from "./components/SectionHighlights";
import SectionInformation from "./components/SectionInformation";

export default function Page() {
  return (
    <>
      <section>
        <SectionHighlights />
      </section>
      <section>
        <SectionInformation />
      </section>
    </>
  );
}
