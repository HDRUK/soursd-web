import Guidance, { GuidanceProps } from "@/components/Guidance";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import PageContent from "../PageContent";
import PageSection from "../PageSection";
import PageTitle from "../PageTitle";

interface PageGuidanceProps extends GuidanceProps {
  title?: ReactNode;
  subTabs?: ReactNode;
  children: ReactNode;
}

export default function PageGuidance({
  title,
  subTabs,
  children,
  ...restProps
}: PageGuidanceProps) {
  return (
    <Guidance {...restProps}>
      {subTabs}
      <PageContent>
        {title && (
          <PageTitle>
            <Typography variant="h3">{title}</Typography>
          </PageTitle>
        )}
        <PageSection sx={{ flexGrow: 1 }}>{children}</PageSection>
      </PageContent>
    </Guidance>
  );
}
