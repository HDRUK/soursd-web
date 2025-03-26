import { Box, styled } from "@mui/material";
import theme from "@/theme";
import { motion } from "motion/react";

const StyledOuterContent = styled("div")`
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
  display: flex;
  width: 100%;
  background: ${theme.palette.homepageUsage.dark};
  color: ${theme.palette.homepageUsage.contrastText};
  padding-top: 24px;
  padding-bottom: 24px;
  justify-content: center;
`;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledGrid = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: inline-grid;
  width: min(1300px, 100%);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const StyledBox = styled(motion.div)`
  padding: 24px;
  display: flex;
`;

export { StyledOuterContent, StyledContent, StyledContainer, StyledGrid, StyledBox };
