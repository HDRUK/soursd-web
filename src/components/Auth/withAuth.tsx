import { ROUTES } from "@/consts/router";
import { getAuthData } from "@/utils/auth";
import { getLocale } from "@/utils/language";
import { redirect } from "next/navigation";

export default function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return async (props: T) => {
    const authData = await getAuthData();
    const locale = await getLocale();

    if (!authData.access_token) {
      redirect(`/${locale || "en"}${ROUTES.login.path}`);
    }

    return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}
