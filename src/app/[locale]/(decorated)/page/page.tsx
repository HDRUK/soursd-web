import HomepageStats from "@/modules/HomepageStats";
import PageSection from "@/modules/PageSection/PageSection";
import { Box, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      {/* <Carousel variant="hero">
        {mockedCarouselSlides.map(carouselSlideProps => (
          <CarouselSlide {...carouselSlideProps} />
        ))}
      </Carousel> */}
      <PageSection>
        <Typography variant="h4" sx={{ mt: 2 }}>
          [Page title]
        </Typography>
      </PageSection>
      <PageSection sx={{ backgroundColor: "background2.main", mt: 1 }}>
        <HomepageStats />
      </PageSection>

      <PageSection>
        {/* <FeatureBox color="background2">
          <FeatureBoxInfo>
            <Typography variant="h5">Quotes title content</Typography>
            <Typography>This is some content</Typography>
          </FeatureBoxInfo>
          <FeatureBoxContent>
            <Carousel>
              <Quote
                name="Researcher"
                description="UKRI"
                elevation={0}
                sx={{ px: 9 }}>
                Researcher quote goes here quote goes here quote
              </Quote>
              <Quote
                name="Researcher"
                description="UKRI"
                elevation={0}
                sx={{ px: 9 }}>
                Researcher quote goes here quote goes here quote
              </Quote>
              <Quote
                name="Researcher"
                description="UKRI"
                elevation={0}
                sx={{ px: 9 }}>
                Researcher quote goes here quote goes here quote
              </Quote>
            </Carousel>
          </FeatureBoxContent>
        </FeatureBox> */}
      </PageSection>
    </Box>
  );
}
