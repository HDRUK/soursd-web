"use client";

import { mockedCookiePolicy } from "@/mocks/data/cms";
import {
  PageBodyContainer,
  PageColumns,
  PageColumnBody,
  PageSection,
} from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";

export default function CookiePolicy() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer
        heading={mockedCookiePolicy.infoTitle}
        sx={{ width: "100%" }}>
        <PageColumns>
          <PageColumnBody lg={12}>
            <PageSection fontSize={18}>Content</PageSection>
          </PageColumnBody>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
