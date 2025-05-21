import { Box, BoxProps } from "@mui/material";
import SectionHeading, {
  SectionHeadingProps,
} from "../../components/SectionHeading";

type PageBodyContainerProps = BoxProps & SectionHeadingProps;

export default function PageBodyContainer({
  children,
  heading,
  description,
  ...restProps
}: PageBodyContainerProps) {
  return (
    <Box {...restProps}>
      {heading && (
        <SectionHeading
          type="content"
          variant="h1"
          heading={heading}
          description={description}
          size="large"
          sx={{
            mb: 4,
          }}
        />
      )}
      {children}
    </Box>
  );
}
