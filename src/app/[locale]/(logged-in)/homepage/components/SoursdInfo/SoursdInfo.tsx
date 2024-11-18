"use client";

import { mockedSoursdHomepageInfo } from "@/mocks/data/cms";
import { framerYSpring } from "@/utils/framer";
import { StyledContent } from "./SoursdInfo.styles";

export default function SoursdInfo() {
  return (
    <StyledContent {...framerYSpring}>
      {mockedSoursdHomepageInfo.info}
    </StyledContent>
  );
}
