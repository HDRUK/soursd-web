import { Carousel, CarouselSlide } from "@/components/Carousel";
import { mockedCarouselSlides } from "@/components/Carousel/mockData";
import PageSection from "@/modules/PageSection/PageSection";

export default function Page() {
  return (
    <div>
      <PageSection>Content</PageSection>
      <Carousel>
        {mockedCarouselSlides.map(carouselSlideProps => (
          <CarouselSlide {...carouselSlideProps} />
        ))}
      </Carousel>
    </div>
  );
}
