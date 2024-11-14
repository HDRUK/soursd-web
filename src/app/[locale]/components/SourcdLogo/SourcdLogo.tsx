import { BoxProps } from "@mui/system";
import { useTranslations } from "next-intl";
import Image from "next/image";
import image from "public/soursd_logo.svg";
import { StyledLogoContainer, StyledLogoTitle } from "./SourcdLogo.styles";

const NAMESPACE_TRANSLATIONS_SOURCD_LOGO = "SourcdLogo";

interface SourcdLogoProps extends BoxProps {
  variant?: "basic" | "titled";
}

export default function SourcdLogo({
  variant = "basic",
  ...restProps
}: SourcdLogoProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SOURCD_LOGO);

  return (
    <StyledLogoContainer {...restProps}>
      <Image src={image} alt="SOURCD" width={90} height={90} />
      {variant === "titled" && (
        <StyledLogoTitle variant="h1">{t("logoTitle")}</StyledLogoTitle>
      )}
    </StyledLogoContainer>
  );
}
