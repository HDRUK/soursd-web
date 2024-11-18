import { Box, styled } from "@mui/material";
import { motion } from "motion/react";

const StyledContainer = styled(Box)`
  border-radius: 40px;
  background: #ffffff;
  box-shadow:
    13px 13px 31px #c2c2c2,
    -13px -13px 31px #ffffff;
  margin: 50px;
  margin-bottom: 100px;
`;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const StyledGrid = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  column-gap: 15%;
  padding: 20px;
`;

const StyledBox = styled(motion.div)`
  padding-top: 24px;
  display: flex;
`;

export { StyledContent, StyledContainer, StyledGrid, StyledBox };
