import { Box, styled } from "@mui/material";
import theme from "@/theme";
import { motion } from "motion/react";

const StyledOuterContent = styled(motion.div)`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${theme.palette.homepageUsage.light};
  color: ${theme.palette.homepageUsage.contrastText};
`;

const StyledContainer = styled(Box)`
  border-radius: 24px;
  background: ${theme.palette.homepageUsage.dark};
  color: ${theme.palette.homepageUsage.contrastText};
  padding-top: 24px;
  padding-bottom: 24px;
`;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const StyledGrid = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: inline-grid;
  grid-template-columns: auto auto auto;
`;

const StyledBox = styled(motion.div)`
  padding: 24px;
  display: flex;
`;

export { StyledOuterContent, StyledContent, StyledContainer, StyledGrid, StyledBox };
