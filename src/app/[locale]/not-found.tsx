import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

const NAMESPACE_TRANSLATIONS = "Application";

export default function NotFound() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <OverlayCenter>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}>
        <Image
          src="/images/errors/404.png"
          alt="404 error"
          width={433}
          height={152}
        />
        <Message severity="error">
          {t.rich("notFound", {
            contactLink: ContactLink,
          })}
        </Message>
      </Box>
    </OverlayCenter>
  );
}
