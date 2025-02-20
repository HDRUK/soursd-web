import FormSection from "@/components/FormSection";
import { FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageBodyContainer, PageGuidance } from "@/modules";
import Text from "@/components/Text";
import InfoIcon from "@mui/icons-material/Info";

import { getFileHref, getLatestCV } from "@/utils/file";
import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import Form from "@/components/Form";
import { useMutation } from "@tanstack/react-query";
import { putUserQuery } from "@/services/users";
import ContactLink from "@/components/ContactLink";
import { showAlert } from "@/utils/showAlert";
import ReactDOMServer from "react-dom/server";
import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);
  const router = useRouter();

  const latestCV = getLatestCV(user?.registry?.files || []);

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload("cvUploadFailed");

  const uploadFile = useUserFileUpload({
    user,
    fileType: FileType.CV,
    upload,
  });

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const updatedUser = await uploadFile(e);

      if (updatedUser) setUser(updatedUser);
    },
    []
  );

  const updateUser = useMutation(putUserQuery(user?.id));

  const handleDetailsSubmit = useCallback(
    async () => {
      try {
        if (user?.id) {
          const request = {
            ...user,
          };

          await updateUser.mutateAsync(request);
        }

        showAlert("success", {
          text: tProfile("postUserSuccess"),
          confirmButtonText: tProfile("postUserSuccessButton"),
          preConfirm: () => {
            router.push(ROUTES.profileResearcherTraining.path);
          },
        });
      } catch (_) {
        showAlert("error", {
          text: ReactDOMServer.renderToString(
            tProfile.rich("postUserError", {
              contactLink: ContactLink,
            })
          ),
          confirmButtonText: tProfile("postUserErrorButton"),
        });
      }
    },
    [user]
  );

  const error =
    updateUser.isError &&
    tProfile.rich(updateUser.error, {
      contactLink: ContactLink,
    });

  const formOptions = {
    error
  };

  return (
    <PageBodyContainer heading={tProfile("experienceTitle")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <Form
            onSubmit={handleDetailsSubmit}
            {...formOptions}
            key={user?.id}>
            <>
              <FormSection heading={tProfile("experienceForm")}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12} key="cv_upload">
                    <FormControlHorizontal
                      name="cv_upload"
                      renderField={() => (
                        <FileUploadDetails
                          fileButtonText={tProfile("uploadCv")}
                          fileHref={getFileHref(latestCV?.name)}
                          fileType={FileType.CV}
                          fileNameText={
                            file?.name || tProfile("noCertificationUploaded")
                          }
                          isSizeInvalid={isSizeInvalid}
                          isScanning={isScanning}
                          isScanComplete={isScanComplete}
                          isScanFailed={isScanFailed}
                          isUploading={isUploading}
                          onFileChange={handleFileChange}
                          message="certificationUploadFailed"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              <FormActions>
                <ProfileNavigationFooter
                  previousHref={ROUTES.profileResearcherAffiliations.path}
                  nextStepText={tProfile("trainingAndAccreditations")}
                  isLoading={updateUser.isPending}
                />
              </FormActions>
            </>
          </Form>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
