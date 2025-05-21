"use client";

import StatsBox, { StatsBoxProps } from "../../components/StatsBox";
import { StyledHomepageStats } from "./HomepageStats.styles";

interface HomepageStatsProps {
  statsBoxProps?: StatsBoxProps;
}

export default function HomepageStats({ statsBoxProps }: HomepageStatsProps) {
  const mergedStatsBoxProps = {
    color: "highlight",
    elevation: 0,
    ...statsBoxProps,
  };

  return (
    <StyledHomepageStats>
      <StatsBox
        description="Data Access Requests Processed"
        value="162,000"
        {...mergedStatsBoxProps}
      />
      <StatsBox
        description="Verififed Researchers"
        value="36,000"
        {...mergedStatsBoxProps}
      />
      <StatsBox
        description="Researcher Endorsements Recorded"
        value="1.3 m"
        {...mergedStatsBoxProps}
      />
    </StyledHomepageStats>
  );
}
