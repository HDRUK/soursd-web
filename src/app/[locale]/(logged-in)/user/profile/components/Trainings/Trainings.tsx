import { ROUTES } from "@/consts/router";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { Box, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import { useStore } from "@/data/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { patchUserQuery, getUserQuery } from "@/services/users";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { User } from "@/types/application";
import ReactDOMServer from "react-dom/server";
import ContactLink from "@/components/ContactLink";
import LoadingWrapper from "@/components/LoadingWrapper";
import Form from "@/components/Form";
import { useMemo } from "react";
import Training from "../Training";
import ProfessionalsRegistration from "../ProfessionalRegistrations";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Trainings() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const router = useRouter();

  const { user } = useStore(state => ({
    user: state.config.user,
  }));

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery(getUserQuery(user?.id));

  const { mutateAsync: patchUser, ...patchUserQueryState } = useMutation(
    patchUserQuery(user?.id ?? -1)
  );

  useQueryAlerts(patchUserQueryState, {
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        tProfile.rich("postUserError", {
          contactLink: ContactLink,
        })
      ),
    },
    successAlertProps: {
      text: tProfile("postUserSuccess"),
    },
  });

  const handleSubmit = async (data: Partial<User>) => {
    await patchUser(data);
    refetch();
    router.push(ROUTES.profileResearcherHome.path);
  };

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        uksa_registered: !!userData?.data?.uksa_registered,
        declaration_signed: !!userData?.data?.declaration_signed,
      },
    }),
    [userData?.data?.uksa_registered, userData?.data?.declaration_signed]
  );

  return (
    <LoadingWrapper variant="basic" loading={isLoading}>
      <Form {...formOptions} onSubmit={handleSubmit} key={userData?.data?.id}>
        <PageBodyContainer heading={tProfile("trainingTitle")}>
          <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
            <PageBody>
              <PageSection>
                <Training />
              </PageSection>
              <PageSection>
                <ProfessionalsRegistration />
              </PageSection>

              <Box sx={{ mt: 1, maxWidth: "50%" }}>
                <FormControlCheckbox
                  name="uksa_registered"
                  label={tProfile("accreditedResearcherCheckboxLabel")}
                  labelCaption={
                    <Link
                      href={tProfile("accreditedResearcherLinkHref")}
                      color="primary"
                      target="_blank"
                      sx={{ display: "block", mt: 0.5, fontSize: "medium" }}>
                      {tProfile("findOutMore")}
                    </Link>
                  }
                />
              </Box>

              <Box sx={{ mt: 1, maxWidth: "50%" }}>
                <FormControlCheckbox
                  name="declaration_signed"
                  label={tProfile("userDeclarationCheckboxLabel")}
                  labelCaption={
                    <Link
                      href={tProfile("userDeclarationLinkHref")}
                      color="primary"
                      target="_blank"
                      sx={{ display: "block", mt: 0.5, fontSize: "medium" }}>
                      {tProfile("findOutMore")}
                    </Link>
                  }
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <ProfileNavigationFooter
                  nextStepText={tProfile("completeYourProfile")}
                  isLastStep
                  isLoading={patchUserQueryState.isPending}
                />
              </Box>
            </PageBody>
          </PageGuidance>
        </PageBodyContainer>
      </Form>
    </LoadingWrapper>
  );
}
