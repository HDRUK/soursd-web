"use client";

import { Typography, Button } from "@mui/material";
import image1 from "public/images/homepage/Image1.png";
import image2 from "public/images/homepage/Image2.png";

import Image from "next/image";

import { framerHover } from "@/utils/framer";
import { StyledContent, StyledContainer, StyledGrid } from "./Support.styles";
import AutocompleteInput from "@/components/AutocompleteInput";
import SelectInput from "@/components/SelectInput";
import DateInput from "@/components/DateInput";

export default function Support() {
  return (
    <StyledContent>
      <Typography variant="h2" sx={{ mb: "50px" }}>
        Support
      </Typography>
      <AutocompleteInput options={[]} label={"Test"} value={null} onChange={function (value: string | null): void {
        throw new Error("Function not implemented.");
      } } />
      <SelectInput options={[]} label={"Test"} value={""} onChange={function (value: string): void {
        throw new Error("Function not implemented.");
      } } />
      <DateInput label={"Test"} value={null} onChange={function (date: Date | null): void {
        throw new Error("Function not implemented.");
      } } />
      <StyledGrid>
        <StyledContainer {...framerHover}>
          <Image src={image1} alt="image_1" width={300} height={160} />
          <Button variant="contained" color="secondary" sx={{ margin: "20px" }}>
            Individuals
          </Button>
        </StyledContainer>
        <StyledContainer {...framerHover}>
          <Image src={image1} alt="image_2" width={300} height={160} />
          <Button variant="contained" sx={{ margin: "20px" }}>
            Organisations
          </Button>
        </StyledContainer>
        <StyledContainer {...framerHover}>
          <Image src={image2} alt="image_3" width={300} height={160} />
          <Button variant="contained" color="secondary" sx={{ margin: "20px" }}>
            Data Custodians
          </Button>
        </StyledContainer>
      </StyledGrid>
    </StyledContent>
  );
}
