import { QueryState } from "@/types/form";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import LoadingWrapper from "../LoadingWrapper";
import { Message } from "../Message";

interface ResultsProps extends BoxProps {
  queryState: QueryState;
  noResultsMessage: ReactNode;
  errorMessage: ReactNode;
  count: number | undefined;
  pagination?: ReactNode;
}

export default function Results({
  queryState,
  noResultsMessage,
  errorMessage,
  children,
  count,
  pagination,
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
      {!isLoading && !count && (
        <Message severity="info">{noResultsMessage}</Message>
      )}
      {isError && !isLoading && (
        <Message severity="error">{errorMessage}</Message>
      )}
      <LoadingWrapper variant="basic" loading={isLoading && !isError}>
        {!!count && <div role="list">{children}</div>}
      </LoadingWrapper>
      {pagination && (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}>
          {pagination}
        </Box>
      )}
    </Box>
  );
}
