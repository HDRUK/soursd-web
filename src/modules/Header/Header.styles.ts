import { css, styled } from "@mui/material";
import PageDecoration from "../PageDecoration/PageDecoration";

export const StyledHeader = styled(PageDecoration)(
  () => css`
    min-height: 50px;

    :before,
    :after {
      bottom: 0;
      right: 0;
      transform: translateY(100%);
    }

    :before {
      border-bottom-left-radius: 100%;
    }

    :after {
      border-bottom-right-radius: 100%;
    }
  `
);
