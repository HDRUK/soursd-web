"use client";

import { Carousel } from "@/components/Carousel";
import Quote from "@/components/Quote";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { FeaturesList } from "./components/FeaturesList";
import { StyledContentLayout, StyledHeader, StyledPage } from "./page.styles";
import { useTranslations } from "next-intl";

export default function Page() {
  const theme = useTheme();

  const t = useTranslations();

  return (
    <StyledPage>
      <img src="/purple.wave.svg" alt="Page background" />
      <StyledContentLayout>
        <StyledHeader>
          <div>
            <Button variant="contained" color="secondary">
              {t("Buttons.register")}
            </Button>
          </div>
        </StyledHeader>
        <Grid
          container
          spacing={{
            xs: 2,
            md: 10,
          }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              alignItems: "center",
              display: "flex",
            }}>
            <Box component="section" sx={{ px: 3 }}>
              <Typography variant="h3" color="white">
                What does the Researcher Registry do?
              </Typography>
              <Box
                component={FeaturesList}
                features={[
                  {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non",
                  },
                  {
                    text: "Consectetur adipiscing elit. Nam non",
                  },
                  {
                    text: "Amet, consectetur adipiscing elit. Nam non",
                  },
                  {
                    text: "Nam non amet",
                  },
                  {
                    text: "Amet, consectetur adipiscing. Nam non",
                  },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Carousel arrowProps={{ color: "highlight3" }}>
              <img src="/feature1.png" />
              <img src="/feature1.png" />
            </Carousel>
          </Grid>
        </Grid>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "flex-end",
          }}>
          <Carousel
            width="600px"
            arrowProps={{
              color: "highlight3",
            }}
            sx={{
              width: "600px",
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
            }}>
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
        </Box>
      </StyledContentLayout>
    </StyledPage>
  );
}
