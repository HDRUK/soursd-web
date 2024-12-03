import { QueryState } from "@/types/form";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import LoadingWrapper from "../LoadingWrapper";
import { Message } from "../Message";

interface ResultsProps extends BoxProps {
  queryState: QueryState;
  noResultsMessage: ReactNode;
  errorMessage: ReactNode;
}

export default function Results({
  queryState,
  noResultsMessage,
  errorMessage,
  children,
  ...restProps
}: ResultsProps) {
  const { isLoading, isError } = queryState;

  return (
    <Box
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        ...restProps.sx,
      }}>
      {isLoading && <Message severity="info">{noResultsMessage}</Message>}
      {isError && !isLoading && (
        <Message severity="error">{errorMessage}</Message>
      )}
      <LoadingWrapper variant="basic" loading={isLoading && !isError}>
        <div role="list">{children}</div>
      </LoadingWrapper>
    </Box>
  );
}
