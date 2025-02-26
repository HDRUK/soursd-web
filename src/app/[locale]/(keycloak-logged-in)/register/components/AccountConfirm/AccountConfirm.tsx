"use client";

import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import SoursdLogo from "@/components/SoursdLogo";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { AccountType } from "@/types/accounts";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useRegisterUser from "@/hooks/useRegisterUser";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

export default function AccountConfirm() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const [selected, setSelected] = useState<AccountType | null>(null); // To track selected button
  const [termsChecked, setTermsChecked] = useState(false); // To track checkbox

  const { handleRegister, ...registerUserState } = useRegisterUser({
    selected,
  });

  const handleSelect = (option: AccountType) => {
    setSelected(option);
  };

  const isContinueDisabled = selected === null || !termsChecked;

  const { isPending, isError, error } = registerUserState;

  return (
    <Guidance {...mockedPersonalDetailsGuidanceProps}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 4,
        }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <SoursdLogo sx={{ backgroundColor: "transparent" }} />
          <Typography variant="h3"> {t("title")}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginBottom: 4,
          }}>
          <AccountOption
            icon={PeopleIcon}
            label={t("repOrgButton")}
            onClick={handleSelect}
            name={AccountType.ORGANISATION}
            selected={selected}
          />
          <AccountOption
            icon={PersonIcon}
            label={t("repMyselfButton")}
            onClick={handleSelect}
            name={AccountType.USER}
            selected={selected}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsChecked}
                onChange={e => setTermsChecked(e.target.checked)}
              />
            }
            label={t.rich("termsLabel", {
              // eslint-disable-next-line react/no-unstable-nested-components
              bold: chunks => <strong> {chunks} </strong>,
            })}
          />
          <LoadingButton
            onClick={handleRegister}
            variant="contained"
            disabled={isContinueDisabled || isPending}
            sx={{ p: 2 }}
            fullWidth>
            {t("continueButton")}
          </LoadingButton>
          {isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {t(error)}
            </Message>
          )}
        </Box>
      </Box>
    </Guidance>
  );
}
