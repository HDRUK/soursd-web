import Image from "next/image";
import image from "public/soursd_logo.svg";
import { useTranslations } from "next-intl";
import { StyledLogoContainer, StyledLogoTitle } from "./SourcdLogo.styles";

const NAMESPACE_TRANSLATIONS_SOURCD_LOGO = "SourcdLogo";

export default function SourcdLogo() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SOURCD_LOGO);

  return (
    <StyledLogoContainer>
      <Image src={image} alt="SOURCD" width={100} height={100} />
      <StyledLogoTitle variant="h1">{t("logoTitle")}</StyledLogoTitle>
    </StyledLogoContainer>
  );
}
