import ContactLink from "@/components/ContactLink";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useTranslations } from "next-intl";
import { HTMLAttributes } from "react";
import PageContainer from "@/modules/PageContainer";

type PageProps = HTMLAttributes<HTMLDivElement>;

const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function Page(props: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);

  return (
    <PageContainer>
      <div {...props}>
        <OverlayCenterAlert>
          {t.rich("noVerificationCode", {
            contactLink: ContactLink,
          })}
        </OverlayCenterAlert>
      </div>
    </PageContainer>
  );
}
