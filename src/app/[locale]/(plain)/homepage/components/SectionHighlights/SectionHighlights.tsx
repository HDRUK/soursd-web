"use client";

import { Carousel } from "@/components/Carousel";
import Quote from "@/components/Quote";
import ScreenArrow from "@/components/ScreenArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import DecoratorPanel from "../../../components/DecoratorPanel";
import { FeaturesList } from "../FeaturesList";
import { StyledContentLayout, StyledHeader } from "./SectionHighlights.styles";

export default function RegistryHighlights() {
  const theme = useTheme();
  const t = useTranslations();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <DecoratorPanel>
      <StyledContentLayout>
        <StyledHeader>
          <div>
            <Button variant="contained" color="secondary">
              {t("Buttons.login")}
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
            <Box component="section" sx={{ px: 3, mb: 5 }}>
              <Typography variant="h3" color="white">
                What does the Researcher Registry do?
              </Typography>
              <FeaturesList
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
              <img src="/feature1.png" alt="Feature 1" />
              <img src="/feature1.png" alt="Feature 2" />
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
      {isDesktop && (
        <ScreenArrow relativeTo="container">
          <Typography>Scroll down</Typography>
          <ExpandMoreIcon fontSize="large" />
        </ScreenArrow>
      )}
    </DecoratorPanel>
  );
}
