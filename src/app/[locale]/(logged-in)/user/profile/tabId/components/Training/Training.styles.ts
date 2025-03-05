import theme from "@/theme";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)`
  margin-top: 20px;
  background-color: ${theme.palette.lightPurple?.main};
  padding: 20px;
`;

export { StyledBox };
