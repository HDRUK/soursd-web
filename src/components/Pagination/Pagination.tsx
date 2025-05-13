import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

import PaginationItem from "@mui/material/PaginationItem";

import { Box } from "@mui/material";
import Next from "./Next";
import Previous from "./Previous";
import { paginationSx } from "./Pagination.styles";

interface PaginationProps extends MuiPaginationProps {
  isLoading?: boolean;
}
const Pagination = ({ isLoading = false, ...rest }: PaginationProps) => {
  if (isLoading) return null;

  return (
    <Box sx={paginationSx}>
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
    </Box>
  );
};

export default Pagination;
