"use client";

import {
  PageBodyContainer,
  PageColumns,
  PageColumnBody,
  PageSection,
} from "@/modules";
import Markdown from "@/components/Markdown";
import cookiePolicyContent from "./cookie_policy.md";
import InfoPageWrapper from "../../../components/InfoPageWrapper";

export default function CookiePolicy() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer
        sx={{ width: "100%", mx: 2, px: 2, background: "white" }}>
        <PageColumns>
          <PageColumnBody lg={12}>
            <PageSection fontSize={18}>
              <Markdown>{cookiePolicyContent}</Markdown>
            </PageSection>
          </PageColumnBody>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
