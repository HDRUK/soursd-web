"use client";

import { Typography } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "@/components/Carousel";

import { StyledContent, StyledCarouselItem } from "./KeyFeatures.styles";

export default function KeyFeatures() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    dots: true,
  };

  return (
    <StyledContent>
      <Typography variant="h2" sx={{ padding: "10px", mb: "20px" }}>
        Key Features
      </Typography>
      <Typography variant="h6">
        Capabilities for Users, Organisations, and Data Custodians
      </Typography>
      <Carousel width="100%" sx={{ padding: "100px" }} settings={settings}>
        <StyledCarouselItem>
          <AssignmentIndOutlinedIcon sx={{ fontSize: "100px" }} />
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            User & Organisation Registers
          </Typography>
          <Typography variant="body1">
            A centralised ‘Know Your User and Organisation’ system for
            individual Researchers and Organisations to create profiles and
            share relevant information for Data Custodians to assess if a person
            is ‘Safe’{" "}
          </Typography>
        </StyledCarouselItem>
        <StyledCarouselItem>
          <VisibilityOutlinedIcon sx={{ fontSize: "100px" }} />
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Visibility across Data Custodians
          </Typography>
          <Typography variant="body1">
            Records Data Custodian approvals for previous and current projects
            as well as approvals for other functionality in complementary
            systems.
          </Typography>
        </StyledCarouselItem>
        <StyledCarouselItem>
          <KeyOutlinedIcon sx={{ fontSize: "100px" }} />
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Single Sign-On through multiple authentication routes
          </Typography>
          <Typography variant="body1">
            Provides a mechanism to associate a SOURSD account with other
            accounts e.g. Health Data research Gateway account.
          </Typography>
        </StyledCarouselItem>
      </Carousel>
    </StyledContent>
  );
}
