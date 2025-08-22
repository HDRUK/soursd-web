"use client";

import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import SoursdLogo from "@/components/SoursdLogo";
import { AccountType } from "@/types/accounts";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import TermsAndConditionsModal from "@/components/TermsAndConditionsModal";
import { useRouter, useSearchParams } from "next/navigation";
import { showAlert } from "@/utils/showAlert";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdQuery } from "@/services/users";
import { User } from "@/types/application";
import { getCombinedQueryState } from "@/utils/query";
import { ROUTES } from "@/consts/router";
import useRegisterUser from "@/hooks/useRegisterUser";
import { handleRegister as handleRegisterKeycloak } from "@/utils/keycloak";
import { UserGroup } from "@/consts/user";
import useAuth from "@/hooks/useAuth";
import LoadingWrapper from "@/components/LoadingWrapper";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";
const NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS = "TermsAndConditions";

interface AccountConfirmProps {
  showAccountPicker: boolean;
  pendingAccount: boolean;
  hasAccessToken: boolean;
}

const isValidAccountType = (accountType?: string | null) => {
  return (
    accountType === AccountType.USER || accountType === AccountType.ORGANISATION
  );
};

export default function AccountConfirm({
  showAccountPicker,
  pendingAccount,
  hasAccessToken,
}: AccountConfirmProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tTerms = useTranslations(NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS);
  const router = useRouter();
  const auth = useAuth();

  const digiIdent = Cookies.get("account_digi_ident");
  const storedAccountType = Cookies.get("account_type");

  const { data: unclaimedUserData, ...unclaimedUserQueryState } = useQuery({
    ...getUserByIdQuery(digiIdent as string),
    enabled: !!digiIdent,
  });
  const params = useSearchParams();

  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const [unclaimedOrgAdmin, setUnclaimedOrgAdmin] =
    useState<Partial<User> | null>(null);

  const accountType = params?.get("type") || storedAccountType;

  useEffect(() => {
    const user = unclaimedUserData?.data;
    if (!user) return;
    if (user.unclaimed === 0 || user.user_group !== UserGroup.ORGANISATIONS) {
      return;
    }

    setUnclaimedOrgAdmin(user);
  }, [unclaimedUserData?.data]);

  useEffect(() => {
    if (!unclaimedOrgAdmin) return;
    setSelectedAccountType(AccountType.ORGANISATION);
  }, [unclaimedOrgAdmin]);

  const { handleRegister, ...registerUserState } = useRegisterUser({
    accountType: accountType || selectedAccountType,
    unclaimedOrgAdmin,
  });

  const handleSelect = (option: AccountType) => {
    setSelectedAccountType(option);
  };

  // Create a new account automatically if type query param exists
  useEffect(() => {
    if (
      pendingAccount &&
      auth.user &&
      accountType &&
      isValidAccountType(accountType) &&
      !unclaimedUserData &&
      !unclaimedUserQueryState.isLoading
    ) {
      handleRegister(auth.user);
    }
  }, [params, pendingAccount, auth.user, accountType]);

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
        disabled={!!selectedAccountType}
        onClick={handleOpenModal}
        variant="text"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "none",
          color: "secondary.main",
          textAlign: "left",
          p: 0,
          pb: 1,
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
    selectedAccountType === null || !termsChecked || !hasAcceptedTerms;

  const queryState = getCombinedQueryState([
    registerUserState,
    unclaimedUserQueryState,
  ]);

  const { isLoading, isError, error } = queryState;

  // Show loader while creating user or org if cookie and account type are available
  if (pendingAccount && isValidAccountType(accountType)) {
    return (
      <Box
        sx={{
          height: "70vh",
          position: "relative",
        }}>
        <LoadingWrapper loading={!isError}>
          <Message severity="error" sx={{ mb: 3 }}>
            {t(error)}
          </Message>
        </LoadingWrapper>
      </Box>
    );
  }

  return (
    <Guidance
      infoTitle={t(`${selectedAccountType || "default"}Title`)}
      info={t(`${selectedAccountType || "default"}Guidance`)}>
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
          <Typography variant="h3">
            {unclaimedOrgAdmin ? t("claimOrgAccount") : t("title")}
          </Typography>
        </Box>

        {!unclaimedUserQueryState.isLoading && showAccountPicker && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              marginBottom: 4,
            }}>
            {!unclaimedOrgAdmin && (
              <AccountOption
                icon={PeopleAltOutlinedIcon}
                label={t.rich("repMyselfButton", {
                  bold: chunks => <strong>{chunks}</strong>,
                })}
                onClick={handleSelect}
                name={AccountType.USER}
                selected={selectedAccountType}
                disabled={!!unclaimedOrgAdmin}
              />
            )}

            <AccountOption
              icon={BusinessIcon}
              label={
                unclaimedOrgAdmin?.organisation?.organisation_name ||
                t.rich("repOrgButton", {
                  bold: chunks => <strong>{chunks}</strong>,
                })
              }
              onClick={handleSelect}
              name={AccountType.ORGANISATION}
              selected={selectedAccountType}
            />

            {/* <AccountOption
              icon={AdminPanelSettingsOutlined}
              label={t.rich("repCustodianButton", {
                bold: chunks => <strong>{chunks}</strong>,
                br: () => <br />,
              })}
              onClick={handleSelect}
              name={AccountType.CUSTODIAN}
              selected={selectedAccountType}
              disabled={!!unclaimedOrgAdmin}
            /> */}
          </Box>
        )}

        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}>
          {(!accountType ||
            !auth.user ||
            !unclaimedOrgAdmin ||
            !unclaimedUserData) && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsChecked}
                  onChange={e => setTermsChecked(e.target.checked)}
                  disabled={!hasAcceptedTerms}
                />
              }
              label={
                <Typography fontSize={14} textAlign="left" maxWidth={300}>
                  {t.rich("termsLabel", { bold: renderBoldText })}
                </Typography>
              }
            />
          )}

          {!pendingAccount && (
            <LoadingButton
              onClick={() => {
                Cookies.set("account_type", selectedAccountType!);
                handleRegisterKeycloak(selectedAccountType);
              }}
              variant="contained"
              disabled={isContinueDisabled || isLoading}
              sx={{ p: 2 }}
              fullWidth>
              {t("continueButton")}
            </LoadingButton>
          )}

          {hasAccessToken && (
            <LoadingButton
              onClick={() => auth.user && handleRegister(auth.user)}
              disabled={registerUserState.isLoading}
              variant="contained"
              sx={{ p: 2 }}
              fullWidth>
              {t("continueButton")}
            </LoadingButton>
          )}

          {isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {t(error)}
            </Message>
          )}
        </Box>
        {(!hasAcceptedTerms || !termsChecked) && !pendingAccount && (
          <Message severity="info">{tTerms("termsAndConditionsInfo")}</Message>
        )}
      </Box>

      <TermsAndConditionsModal
        accountType={selectedAccountType}
        open={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />
    </Guidance>
  );
}
