"use client";

import {
  PageBodyContainer,
  PageColumns,
  PageColumnBody,
  PageSection,
} from "@/modules";
import Markdown from "@/components/Markdown";
import privacyPolicyContent from "./privacy_policy.md";
import InfoPageWrapper from "../../../components/InfoPageWrapper";

export default function PrivaryPolicy() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer
        sx={{ width: "100%", m: 2, px: 2, background: "white" }}>
        <PageColumns>
          <PageColumnBody lg={12}>
            <PageSection fontSize={18} sx={{ p: 2 }}>
              <Markdown>{privacyPolicyContent}</Markdown>
            </PageSection>
          </PageColumnBody>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
