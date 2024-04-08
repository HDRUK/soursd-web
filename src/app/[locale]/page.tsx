import BoxGroup from "@/components/BoxGroup";
import { Carousel, CarouselSlide } from "@/components/Carousel";
import { mockedCarouselSlides } from "@/components/Carousel/mockData";
import Quote from "@/components/Quote";
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
      <BoxGroup sx={{ mt: 1 }}>
        <Quote>Researcher quote goes here</Quote>
        <Quote>Researcher quote goes here</Quote>
        <Quote>Researcher quote goes here</Quote>
      </BoxGroup>
    </div>
  );
}
