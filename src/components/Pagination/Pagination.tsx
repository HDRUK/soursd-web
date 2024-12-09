import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

import PaginationItem from "@mui/material/PaginationItem";

import { StyledPagination } from "./Pagination.styles";

import Next from "./Next";
import Previous from "./Previous";

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
              previous: Previous,
              next: Next,
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
