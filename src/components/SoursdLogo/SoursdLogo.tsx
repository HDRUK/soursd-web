import { BoxProps } from "@mui/system";
import { useTranslations } from "next-intl";
import Image from "next/image";
import image from "public/soursd_logo.svg";
import { StyledLogoContainer, StyledLogoTitle } from "./SoursdLogo.styles";

const NAMESPACE_TRANSLATIONS_SOURSD_LOGO = "SoursdLogo";

export interface SoursdLogoProps extends BoxProps {
  variant?: "basic" | "titled";
  size?: number;
}

export default function SoursdLogo({
  variant = "basic",
  size = 90,
  ...restProps
}: SoursdLogoProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SOURSD_LOGO);

  return (
    <StyledLogoContainer variant={variant} {...restProps}>
      <Image src={image} alt="SOURSD" width={size} height={size} priority />
      {variant === "titled" && (
        <StyledLogoTitle variant="h1">{t("logoTitle")}</StyledLogoTitle>
      )}
    </StyledLogoContainer>
  );
}
