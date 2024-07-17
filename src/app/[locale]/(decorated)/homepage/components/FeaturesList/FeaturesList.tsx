import { useApplicationData } from "@/context/ApplicationData";
import { Check } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  Link,
  List,
  ListItem,
  Typography,
  useTheme,
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
  const { routes } = useApplicationData();

  const theme = useTheme();

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
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button color="secondary" variant="outlined">
          {t("Buttons.contactUs")}
        </Button>
        <Button variant="contained" color="secondary">
          <Link
            href={routes.signup.path}
            underline="none"
            sx={{ color: theme.palette.secondary.contrastText }}>
            {t("Buttons.register")}
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
