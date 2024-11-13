import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import SourcdLogo from "../SourcdLogo";
import { StyledContainer, StyledHeader, StyledButton } from "./NavBar.styles";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

type ButtonColor = "primary" | "secondary" | "inherit" | undefined;
type ButtonVariant = "contained" | "text" | undefined;

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);

  const buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text: string;
  }[] = [
    { color: "inherit", variant: "text", text: t("homeButton") },
    { color: "inherit", variant: "text", text: t("aboutButton") },
    { color: "inherit", variant: "text", text: t("featuresButton") },
    { color: "inherit", variant: "text", text: t("supportButton") },
    { color: "inherit", variant: "text", text: t("contactButton") },
    { color: "secondary", variant: "contained", text: t("signInButton") },
    { color: "primary", variant: "contained", text: t("registerButton") },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <SourcdLogo />
        <Box>
          {buttons.map(button => (
            <StyledButton color={button.color} variant={button.variant}>
              {button.text}
            </StyledButton>
          ))}
        </Box>
      </StyledHeader>
      <Divider sx={{ height: "8px", padding: "0" }} />
    </StyledContainer>
  );
}
