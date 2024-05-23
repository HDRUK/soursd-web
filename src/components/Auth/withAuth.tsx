import { useApplicationData } from "@/context/ApplicationData";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function withAuth<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const token = JSON.parse(Cookies.get("auth") || "{}")?.access_token;
    const { routes } = useApplicationData();

    if (!token) {
      redirect(routes.login.path);
    }

    return <WrappedComponent {...(props as T)} />;
  };
}
