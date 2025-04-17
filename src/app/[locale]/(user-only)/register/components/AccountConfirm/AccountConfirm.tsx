"use client";

import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import SoursdLogo from "@/components/SoursdLogo";
import { mockedRegisterGuidanceProps } from "@/mocks/data/cms";
import { AccountType } from "@/types/accounts";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import useRegisterUser from "@/hooks/useRegisterUser";
import TermsAndConditionsModal from "@/components/TermsAndConditionsModal";
import { useRouter } from "next/navigation";
import { showAlert } from "@/utils/showAlert";
import { ROUTES } from "@/consts/router";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";
const NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS = "TermsAndConditions";

export default function AccountConfirm() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tTerms = useTranslations(NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS);
  const router = useRouter();

  const [selected, setSelected] = useState<AccountType | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const { handleRegister, ...registerUserState } = useRegisterUser({
    selected,
  });

  const handleSelect = (option: AccountType) => {
    setSelected(option);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    setTermsChecked(true);
    handleCloseModal();
  };

  const handleDeclineTerms = () => {
    handleCloseModal();
    setTimeout(() => {
      showAlert("warning", {
        text: tTerms("alertText"),
        title: tTerms("alertTitle"),
        confirmButtonText: tTerms("alertConfirm"),
        cancelButtonText: tTerms("alertCancel"),
        closeOnConfirm: true,
        closeOnCancel: true,
        preConfirm: () => {
          router.push(ROUTES.homepage.path);
        },
        preDeny: () => {
          handleOpenModal();
        },
      });
    }, 100);
  };

  const renderBoldText = useCallback(
    (chunks: React.ReactNode) => (
      <Button
        disabled={!!selected}
        onClick={handleOpenModal}
        variant="text"
        sx={{
          pb: 1,
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "none",
          "&:hover": {
            backgroundColor: "none",
            textDecoration: "underline",
          },
        }}>
        {chunks}
      </Button>
    ),
    []
  );

  const isContinueDisabled =
    selected === null || !termsChecked || !hasAcceptedTerms;
  const { isPending, isError, error } = registerUserState;

  return (
    <Guidance {...mockedRegisterGuidanceProps}>
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
                disabled={!hasAcceptedTerms}
              />
            }
            label={t.rich("termsLabel", { bold: renderBoldText })}
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
        {(!hasAcceptedTerms || !termsChecked) && (
          <Message severity="info">{tTerms("termsAndConditionsInfo")}</Message>
        )}
      </Box>

      <TermsAndConditionsModal
        accountType={selected}
        open={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />
    </Guidance>
  );
}
