import { Box, styled } from "@mui/material";

const StyledContent = styled("div")`
  background: linear-gradient(180deg, #7b2f8b, #d8c4dc 100%);
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 100px;
  color: white;
`;

const StyledCarouselItem = styled(Box)`
  padding-bottom: 40px;
`;

export { StyledContent, StyledCarouselItem };
