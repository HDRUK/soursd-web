import { ROUTES } from "@/consts/router";
import DecoratorPanel from "@/modules/DecoratorPanel";
import { getAuthData } from "@/utils/auth";
import { getLocale } from "@/utils/language";
import { getRoutes, isRouteAllowed } from "@/utils/router";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ContactLink from "../ContactLink";
import OverlayCenterAlert from "../OverlayCenterAlert";

const NAMESPACE_TRANSLATIONS_AUTH = "Auth";

export default function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return async (props?: T) => {
    const authData = await getAuthData();
    const locale = await getLocale();
    const t = await getTranslations(NAMESPACE_TRANSLATIONS_AUTH);
    const pathname = headers().get("x-current-path");
    const routes = getRoutes(ROUTES, locale);
    const isAllowed = isRouteAllowed(pathname, routes, authData);

    if (!authData.access_token) {
      return redirect(routes.login.path);
    }

    if (!isAllowed) {
      return (
        <DecoratorPanel>
          <OverlayCenterAlert>
            {t.rich("notAllowed", {
              contactLink: ContactLink,
            })}
          </OverlayCenterAlert>
        </DecoratorPanel>
      );
    }

    return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}
