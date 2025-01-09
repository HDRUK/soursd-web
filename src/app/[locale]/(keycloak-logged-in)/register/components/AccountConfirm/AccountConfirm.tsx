"use client";

import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import SoursdLogo from "@/components/SoursdLogo";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { AccountType } from "@/types/accounts";
import { getCombinedQueryState } from "@/utils/query";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import useRegisterCustodian from "../../../../../../hooks/useRegisterCustodian";
import useRegisterUser from "../../../../../../hooks/useRegisterUser";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

interface AccountConfirmProps {
  email?: string;
}

export default function AccountConfirm({ email }: AccountConfirmProps) {
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const [selected, setSelected] = useState<AccountType | null>(null); // To track selected button
  const [termsChecked, setTermsChecked] = useState(false); // To track checkbox

  const registerCustodianState = useRegisterCustodian(email);
  const { handleRegister, ...registerUserState } = useRegisterUser({
    selected,
    params,
  });

  const handleSelect = (option: AccountType) => {
    setSelected(option);
  };

  const isContinueDisabled = selected === null || !termsChecked;

  const { isLoading, isError, error } = getCombinedQueryState([
    registerCustodianState,
    registerUserState,
  ]);

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
          <Button
            onClick={handleRegister}
            variant="contained"
            disabled={isContinueDisabled || isLoading}
            sx={{ p: 2 }}
            fullWidth>
            {isLoading ? <CircularProgress size={23} /> : t("continueButton")}
          </Button>

          {isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {`${error[0]}`}
            </Message>
          )}
        </Box>
      </Box>
    </Guidance>
  );
}
