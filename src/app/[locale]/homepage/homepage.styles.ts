"use client";

import theme from "@/theme";
import { styled } from "@mui/material";

const StyledWrapper = styled("div")`
  background: linear-gradient(
    145deg,
    ${theme.palette.background1.extraLight},
    #fff 70%
  );
`;

export { StyledWrapper };
