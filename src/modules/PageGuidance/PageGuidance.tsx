import Guidance, { GuidanceProps } from "@/components/Guidance";
import { ReactNode } from "react";
import { PageContent, PageTitle, PageSection } from "@/modules";
import { Typography } from "@mui/material";

interface PageGuidanceProps extends GuidanceProps {
  title: ReactNode;
  children: ReactNode;
}

export default function PageGuidance({
  title,
  children,
  ...restProps
}: PageGuidanceProps) {
  return (
    <Guidance {...restProps}>
      <PageContent>
        <PageTitle>
          <Typography variant="h3">{title}</Typography>
        </PageTitle>
        <PageSection sx={{ flexGrow: 1 }}>{children}</PageSection>
      </PageContent>
    </Guidance>
  );
}
