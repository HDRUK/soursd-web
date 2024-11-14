"use client";

import { Button, styled } from "@mui/material";

const StyledContainer = styled("div")`
  background: white;
`;

const StyledHeader = styled("header")`
  padding: 10px 20px 0 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const StyledButton = styled(Button)`
  max-height: 30px;
  margin-left: 10px;
`;

export { StyledHeader, StyledContainer, StyledButton };
