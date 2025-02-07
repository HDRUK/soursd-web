import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

interface UseRouteChangeProps {
  canLeave?: boolean;
  onBlocked: (pathname: string | null) => void;
}

export default function useRouteChange({
  canLeave,
  onBlocked,
}: UseRouteChangeProps) {
  const router = useRouter();

  const continueTo = (pathname: string) => {
    router.push(pathname);
  };

  useEffect(() => {
    const handleRouteChange = (e: BeforeUnloadEvent) => {
      if (document.activeElement && !canLeave) {
        e.preventDefault();

        onBlocked(document.activeElement.href);
      }
    };

    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", handleRouteChange);
    });

    return () => {
      document.querySelectorAll("a").forEach(link => {
        link.removeEventListener("click", handleRouteChange);
      });
    };
  }, [canLeave]);

  return {
    continueTo,
  };
}
