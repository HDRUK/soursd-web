"use client";

import Guidance from "@/components/Guidance";
import { useState } from "react";
import { useTranslations } from "next-intl";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SoursdLogo from "@/components/SoursdLogo";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/components/Message";
import { AccountType } from "@/types/accounts";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useApplicationData } from "@/context/ApplicationData";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import AccountOption from "./AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

export default function AccountConfirm() {
  const router = useRouter();
  const { routes } = useApplicationData();

  const [selected, setSelected] = useState<AccountType | null>(null); // To track selected button
  const [termsChecked, setTermsChecked] = useState(false); // To track checkbox

  const handleSelect = (option: AccountType) => {
    setSelected(option);
  };

  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["registerError"],
    mutationFn: (payload: PostRegisterPayload) => {
      return postRegister(payload, {
        error: { message: t("failedToRegister") },
      });
    },
  });

  const handleRegister = async () => {
    if (!selected) return;
    mutateAsync({ account_type: selected }).then(() => {
      // temp
      router.push(`/en/${routes.homepage.path}`);
    });
  };

  const isContinueDisabled = selected === null || !termsChecked;

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
            handleClick={handleSelect}
            name={AccountType.ORGANISATION}
            selected={selected}
          />

          <AccountOption
            icon={PersonIcon}
            label={t("repMyselfButton")}
            handleClick={handleSelect}
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
          <Button
            onClick={handleRegister}
            variant="contained"
            disabled={isContinueDisabled || isPending}
            sx={{ p: 2 }}
            fullWidth>
            {isPending ? <CircularProgress size={23} /> : t("continueButton")}
          </Button>

          {isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {`${error}`}
            </Message>
          )}
        </Box>
      </Box>
    </Guidance>
  );
}
