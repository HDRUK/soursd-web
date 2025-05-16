import { showAlert } from "@/utils/showAlert";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";
import ContactLink from "@/components/ContactLink";
import { Auth } from "../../types/application";

const NAMESPACE_TRANSLATIONS_AUTH = "Auth";

export default function useAuth() {
  const [user, setUser] = useState<Auth | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const t = useTranslations(NAMESPACE_TRANSLATIONS_AUTH);

  useMemo(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser({ email: userData.user.email });
        } else {
          setUser(undefined);
        }
      } catch (_) {
        const errorMessage = ReactDOMServer.renderToString(
          t.rich("authError", { contactLink: ContactLink }) ?? t("authError")
        );
        showAlert("error", {
          text: errorMessage,
          confirmButtonText: t("authErrorButton"),
        });
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}
