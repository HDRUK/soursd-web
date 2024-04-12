import { Carousel, CarouselSlide } from "@/components/Carousel";
import { mockedCarouselSlides } from "@/components/Carousel/mockData";
import {
  FeatureBox,
  FeatureBoxContent,
  FeatureBoxInfo,
} from "@/components/FeatureBox";
import Quote from "@/components/Quote";
import StatsBox from "@/components/StatsBox";
import PageSection from "@/modules/PageSection/PageSection";
import { Box, Grid, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <Carousel variant="hero">
        {mockedCarouselSlides.map(carouselSlideProps => (
          <CarouselSlide
            backgroundTransparencyColor="backgroundBlue"
            {...carouselSlideProps}
          />
        ))}
      </Carousel>
      <PageSection sx={{ backgroundColor: "backgroundBlue.original" }}>
        <Box sx={{ mx: "auto", maxWidth: "800px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <StatsBox
                description="Data Access Requests Processed"
                value="162,000"
                color="highlight"
                elevation={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatsBox
                description="Verififed Researchers"
                value="36,000"
                color="highlight"
                elevation={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatsBox
                description="Researcher Endorsements Recorded"
                value="1.3 m"
                color="highlight"
                elevation={0}
              />
            </Grid>
          </Grid>
        </Box>
      </PageSection>
      <PageSection>Content</PageSection>
      <PageSection>
        <FeatureBox color="backgroundBlue">
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
        </FeatureBox>
      </PageSection>
    </Box>
  );
}
