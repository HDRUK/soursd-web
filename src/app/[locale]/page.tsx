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
        <Quote subTitle="Researcher">
          Researcher quote goes here quote goes here quote
        </Quote>
        <Quote subTitle="Researcher">
          Researcher quote goes here quote goes here quote
        </Quote>
        <Quote subTitle="Researcher">
          Researcher quote goes here quote goes here quote
        </Quote>
      </BoxGroup>
    </div>
  );
}
