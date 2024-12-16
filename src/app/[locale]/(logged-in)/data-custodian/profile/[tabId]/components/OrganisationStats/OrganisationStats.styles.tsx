import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 23%;
  border-radius: 10px;
  box-shadow:
    6px 6px 12px #bebebe,
    -6px -6px 12px #ffffff;
  margin: auto;
  margin-top: 15px;
  align-items: center;
`;

export { StyledBox };
