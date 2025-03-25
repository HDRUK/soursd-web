"use client";

import { Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "@/theme";
import { StyledContent, StyledGrid, StyledContainer } from "./KeyFeatures.styles";

export default function KeyFeatures() {
  // const settings = {
  //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "0",
  //   slidesToShow: 2,
  //   speed: 500,
  //   dots: true,
  // };

  return (
    <StyledContent>
      <Typography variant="h1" sx={{ mb: "16px" }}>
        Key Features
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: "light", color: theme.palette.homepageKeyFeatures.textSecondary }}>
        Capabilities for Users, Organisations, and Data Custodians
      </Typography>
      <StyledGrid width="100%">
        <StyledContainer>
          <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "500" }}>
            User and Organisation Registers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A platform for Users (researchers, analysts, students, others who access 
            sensitive data) and Organisations to create profiles and share relevant 
            information for Data Custodians to assess if a person is ‘Safe’.
          </Typography>
        </StyledContainer>
        <StyledContainer>
          <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Visibility across Data Custodians
          </Typography>
          <Typography variant="body1" color="text.secondary">
            SOURSD records Data Custodian approvals for previous and current projects
            as well as approvals for other functionality in complementary
            systems.
          </Typography>
        </StyledContainer>
        <StyledContainer>
          <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Multiple authentication routes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            SOURSD provides Single Sign-On (SSO) through multiple providers, such as; 
            Google, LinkedIn and LSRI via Keycloak. This enables users to easily 
            associate their SOURSD account with existing credentials.
          </Typography>
        </StyledContainer>
      </StyledGrid>
      <Typography variant="h4" color="primary">
        <a href="">Register for an account to get started</a> or <a href="">sign in here</a>
      </Typography>
    </StyledContent>
  );
}
