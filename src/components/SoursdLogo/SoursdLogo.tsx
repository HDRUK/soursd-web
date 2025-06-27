import { BoxProps } from "@mui/system";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logoDefault from "public/soursd_logo.svg";
import logoWhite from "public/soursd_logo_white.svg";
import { grey } from "@mui/material/colors";
import { StyledLogoContainer, StyledLogoTitle } from "./SoursdLogo.styles";

const NAMESPACE_TRANSLATIONS_SOURSD_LOGO = "SoursdLogo";

export interface SoursdLogoProps extends Omit<BoxProps, "color"> {
  color?: "default" | "white";
  variant?: "basic" | "titled";
  size?: number;
}

export default function SoursdLogo({
  variant = "basic",
  size = 65,
  color,
  ...restProps
}: SoursdLogoProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SOURSD_LOGO);

  const logoColor = color === "white" ? logoWhite : logoDefault;
  const textColor = color === "white" ? "#fff" : grey["700"];

  return (
    <StyledLogoContainer variant={variant} {...restProps}>
      <Image src={logoColor} alt="SOURSD" width={size} height={size} priority />
      {variant === "titled" && (
        <StyledLogoTitle sx={{ color: textColor }}>
          {t("logoTitle")}
        </StyledLogoTitle>
      )}
    </StyledLogoContainer>
  );
}
