"use client";

import image1 from "public/images/homepage/Image1.png";
import image2 from "public/images/homepage/Image2.png";

import Image from "next/image";
import { StyledContainer } from "./HomepageImages.styles";

export default function HomepageImages() {
  return (
    <StyledContainer>
      <Image src={image1} alt="image_1" width={512} height={288} />
      <Image src={image2} alt="image_2" width={512} height={288} />
    </StyledContainer>
  );
}
