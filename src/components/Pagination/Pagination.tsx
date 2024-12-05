import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

import PaginationItem from "@mui/material/PaginationItem";

import { StyledPagination } from "./Pagination.styles";

import CustomNext from "./CustomNext";
import CustomPrevious from "./CustomPrevious";

interface PaginationProps extends MuiPaginationProps {
  isLoading?: boolean;
}
const Pagination = ({ isLoading = false, ...rest }: PaginationProps) => {
  if (isLoading) return null;
  return (
    <StyledPagination>
      <MuiPagination
        renderItem={item => (
          <PaginationItem
            slots={{
              previous: CustomPrevious,
              next: CustomNext,
            }}
            {...item}
          />
        )}
        {...rest}
      />
    </StyledPagination>
  );
};

export default Pagination;
