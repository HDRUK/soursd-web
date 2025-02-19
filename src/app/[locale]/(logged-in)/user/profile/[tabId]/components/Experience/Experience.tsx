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
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

import { getFileHref, getLatestCV } from "@/utils/file";
import { Grid, TextField, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo } from "react";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import Form from "@/components/Form";
import yup from "@/config/yup";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { useMutation } from "@tanstack/react-query";
import { putUserQuery } from "@/services/users";
import ContactLink from "@/components/ContactLink";
import { showAlert } from "@/utils/showAlert";
import ReactDOMServer from "react-dom/server";
import FormActions from "@/components/FormActions";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";

export interface ExperienceFormValues {
  orc_id?: string | null;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
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
    async (fields: ExperienceFormValues) => {
      try {
        if (user?.id) {
          const request = {
            ...user,
            ...fields,
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

  const schema = useMemo(
    () =>
      yup.object().shape({
        orc_id: yup
          .string()
          .required()
          .matches(
            new RegExp(`(${VALIDATION_ORC_ID.source})|^$`),
            tForm("orcIdFormatInvalid")
          ),
      }),
    []
  );
  const error =
    updateUser.isError &&
    tProfile.rich(updateUser.error, {
      contactLink: ContactLink,
    });

  const formOptions = {
    defaultValues: {
      orc_id: user?.orc_id,
    },
    error,
  };

  return (
    <PageBodyContainer heading={tProfile("experienceTitle")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions} key={user?.id}>
            <>
              <FormSection heading={tProfile("experienceForm")}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="orc_id"
                      renderField={fieldProps => (
                        <Text
                          endIcon={
                            <Tooltip title={tForm("whatIsTheOrcId")}>
                              <InfoIcon color="info" />
                            </Tooltip>
                          }
                          sx={{ maxWidth: "200px" }}>
                          <TextField {...fieldProps} />
                        </Text>
                      )}
                    />
                  </Grid>
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
                    previousHref={
                      ROUTES.profileResearcherAffiliations.path
                    }
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
