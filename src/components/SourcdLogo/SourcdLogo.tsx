import { BoxProps } from "@mui/system";
import { useTranslations } from "next-intl";
import Image from "next/image";
import image from "public/soursd_logo.svg";
import { StyledLogoContainer, StyledLogoTitle } from "./SourcdLogo.styles";

const NAMESPACE_TRANSLATIONS_SOURCD_LOGO = "SourcdLogo";

export interface SourcdLogoProps extends BoxProps {
  variant?: "basic" | "titled";
  width?: number;
  height?: number;
}

export default function SourcdLogo({
  variant = "basic",
  width = 90,
  height = 90,
  ...restProps
}: SourcdLogoProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SOURCD_LOGO);

  return (
    <StyledLogoContainer variant={variant} {...restProps}>
      <Image src={image} alt="SOURCD" width={width} height={height} />
      {variant === "titled" && (
        <StyledLogoTitle variant="h1">{t("logoTitle")}</StyledLogoTitle>
      )}
    </StyledLogoContainer>
  );
}
