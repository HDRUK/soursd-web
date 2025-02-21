import { Box, css, styled, TextField } from "@mui/material";

export const StyledSearchBar = styled(Box)(
  () => css`
    display: flex;
    align-items: center;
    border: 1px solid #e0dfe7;
    min-width: 350px;
  `
);

export const StyledInput = styled(TextField)(
  () => css`
    flex-grow: 1;

    & .MuiInputBase-input {
      font-size: 16px;
      color: #333; /* Text color */
    }

    & .MuiOutlinedInput-notchedOutline {
      display: none; /* Remove the outline */
    }

    & .MuiInputBase-root {
      border-radius: 0; /* Optional: Adjust border radius if needed */
    }

    & .Mui-focused .MuiOutlinedInput-notchedOutline {
      display: none; /* Ensure no outline on focus */
    }
  `
);
