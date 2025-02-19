"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import SoursdLogo from "@/components/SoursdLogo";
import ButtonSave from "../ButtonSave";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export type ProfileNavigationFooterProps = {
  nextStepText?: string;
  isLoading?: boolean;
  previousHref?: string;
  isDisabled?: boolean;
};

export default function ProfileNavigationFooter({
  previousHref,
  nextStepText,
  isLoading,
  isDisabled = false,
}: ProfileNavigationFooterProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        {previousHref && (
          <Button
            href={previousHref}
            component="a"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ my: 1 }}>
            {tProfile("previousButton")}
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        {nextStepText && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <SoursdLogo size={50} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Next Step:
            </Typography>
            <Typography>{nextStepText}</Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonSave isLoading={isLoading} sx={{ my: 1 }} disabled={isDisabled}>
          {nextStepText
            ? tProfile("submitAndContinueButton")
            : tProfile("submitButton")}
        </ButtonSave>
      </Grid>
    </Grid>
  );
}
