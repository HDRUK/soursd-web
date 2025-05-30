import { render, screen, waitFor } from "../../utils/testUtils";
import Carousel from "./Carousel";
import CarouselSlide from "./CarouselSlide";
import { mockedCarouselSlides } from "./mockData";

const renderAtSlideIndex = (initialSlide: number) =>
  render(
    <Carousel settings={{ infinite: false, initialSlide }}>
      {mockedCarouselSlides.map(carouselSlideProps => (
        <CarouselSlide key={carouselSlideProps.title} {...carouselSlideProps} />
      ))}
    </Carousel>
  );

describe("<Header />", () => {
  it("has the correct button state at index = 1", async () => {
    renderAtSlideIndex(1);

    const prev = screen.getByLabelText("previous slide");
    const next = screen.getByLabelText("next slide");

    await waitFor(() => {
      expect(prev.getAttribute("disabled")).toBe(null);
      expect(next.getAttribute("disabled")).toBe("");
    });
  });

  it("has the correct button state at index = 1", async () => {
    renderAtSlideIndex(0);

    const prev = screen.getByLabelText("previous slide");
    const next = screen.getByLabelText("next slide");

    await waitFor(() => {
      expect(prev.getAttribute("disabled")).toBe("");
      expect(next.getAttribute("disabled")).toBe(null);
    });
  });
});
