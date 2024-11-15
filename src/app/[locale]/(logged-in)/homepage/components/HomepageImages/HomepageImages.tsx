"use client";

import image1 from "public/images/homepage/Image1.png";
import image2 from "public/images/homepage/Image2.png";

import Image from "next/image";
import { StyledContainer } from "./HomepageImages.styles";

export default function HomepageImages() {
  return (
    <StyledContainer>
      <Image src={image1} alt="image_1" width={450} height={226} />
      <Image src={image1} alt="image_2" width={450} height={226} />
      <Image src={image2} alt="image_3" width={450} height={226} />
    </StyledContainer>
  );
}
