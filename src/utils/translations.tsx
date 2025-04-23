import ContactLink from "@/components/ContactLink";
import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";

const renderErrorToString = (
  t: ReturnType<typeof useTranslations>,
  key: string
) => {
  return ReactDOMServer.renderToString(
    t.rich(key, {
      contactLink: ContactLink,
    })
  );
};

export { renderErrorToString };
