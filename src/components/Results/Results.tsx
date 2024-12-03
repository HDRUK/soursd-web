import { LoadingState } from "@/types/form";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import LoadingWrapper from "../LoadingWrapper";
import { Message } from "../Message";

interface ResultsProps {
  loadingState: LoadingState;
  noResultsMessage: ReactNode;
  errorMessage: ReactNode;
  children: ReactNode;
}

export default function Results({
  loadingState,
  noResultsMessage,
  errorMessage,
  children,
}: ResultsProps) {
  const { isLoading, isError } = loadingState;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {isLoading && <Message severity="info">{noResultsMessage}</Message>}
      {isError && !isLoading && (
        <Message severity="error">{errorMessage}</Message>
      )}
      <LoadingWrapper variant="basic" loading={isLoading && !isError}>
        {children}
      </LoadingWrapper>
    </Box>
  );
}
