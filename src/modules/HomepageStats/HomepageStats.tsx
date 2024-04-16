"use client";

import StatsBox from "@/components/StatsBox";
import { StyledHomepageStats } from "./HomepageStats.styles";

export default function HomepageStats() {
  return (
    <StyledHomepageStats>
      <StatsBox
        description="Data Access Requests Processed"
        value="162,000"
        color="highlight"
        elevation={0}
      />
      <StatsBox
        description="Verififed Researchers"
        value="36,000"
        color="highlight"
        elevation={0}
      />
      <StatsBox
        description="Researcher Endorsements Recorded"
        value="1.3 m"
        color="highlight"
        elevation={0}
      />
    </StyledHomepageStats>
  );
}
