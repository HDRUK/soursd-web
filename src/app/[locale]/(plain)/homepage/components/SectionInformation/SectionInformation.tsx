"use client";

import { getPaletteModeColors } from "@/utils/theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { mockCardData } from "./mockData";

export default function SectionInformation() {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
      }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 6,
          backgroundColor: getPaletteModeColors(theme, "highlight").mode,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
          gap: 2,
        }}>
        <Box sx={{ maxWidth: "900px" }}>
          <Grid container spacing={2}>
            {mockCardData.map(({ title, description }) => (
              <Grid item md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/images/homepage/sample.thumbnail.1.jpeg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ maxWidth: "900px", textAlign: "center" }}>
          <Divider color="#fff" sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 4 }}>
            Praesent ut turpis id urna facilisis porttitor. Sed erat justo,
            congue sit amet lobortis quis, euismod nec quam. Nunc consequat
            sagittis lacinia. Nam maximus est at nunc porta, nec gravida urna
            imperdiet. Suspendisse quis dui sit amet ipsum tristique eleifend
            non vel ipsum. Etiam iaculis nulla dolor, nec lacinia sem egestas
            ut. Sed lectus sem, lacinia eget dolor porttitor, blandit hendrerit
            enim. Aenean nec vehicula diam.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<MailIcon />}>
              {t("Buttons.contactUs")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AppRegistrationIcon />}>
              <Link
                href="signup"
                underline="none"
                sx={{ color: theme.palette.secondary.contrastText }}>
                {t("Buttons.register")}
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
