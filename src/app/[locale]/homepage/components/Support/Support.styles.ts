import { Box, styled } from "@mui/material";
import { motion } from "motion/react";

const StyledContainer = styled(motion.div)`
  padding: 10px;
  background: #ffffff;
  box-shadow:
    0 5px 10px #bebebe,
    0 -5px 10px #ffffff;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: auto;
`;

const StyledGrid = styled("div")`
  justify-content: space-around;
  text-align: center;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  column-gap: 20px;
`;

const StyledBox = styled(Box)`
  padding-top: 24px;
  display: flex;
`;

export { StyledContent, StyledContainer, StyledGrid, StyledBox };
