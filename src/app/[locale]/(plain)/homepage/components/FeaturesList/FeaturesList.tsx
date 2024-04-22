import { Check } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface FeaturesListProps extends BoxProps {
  features: {
    text: ReactNode;
  }[];
}

export default function FeaturesList({
  features,
  ...restProps
}: FeaturesListProps) {
  const t = useTranslations();

  return (
    <Box {...restProps}>
      <List sx={{ mb: 2 }}>
        {features.map(({ text }) => (
          <ListItem sx={{ gap: 1 }} key={uuidv4()}>
            <Check color="secondary" />
            <Typography fontSize="1.25em" color={grey["400"]}>
              {text}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="secondary">
        {t("Buttons.register")}
      </Button>
    </Box>
  );
}
