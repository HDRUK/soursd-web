import FormSection from "@/components/FormSection";
import { FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import { PostEmploymentsPayload } from "@/services/employments/types";
import { getFileHref, getLatestCV } from "@/utils/file";
import EastIcon from "@mui/icons-material/East";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";
import HistoriesSection from "../HistoriesSection";
import EmploymentsForm from "./EmploymentsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);
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

  const onSubmit = useCallback(
    async (employment: PostEmploymentsPayload) => {
      const histories = getHistories();

      if (histories) {
        const updatedHistories = {
          ...histories,
          employments: [...(histories.employments || []), employment],
        };

        setHistories(updatedHistories);
      }
    },
    [getHistories, setHistories]
  );

  return (
    <PageBodyContainer>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <FormSection
            heading={tProfile("accreditations")}
            sx={{ marginBottom: "16px" }}>
            <HistoriesSection
              type="accreditations"
              count={histories?.accreditations?.length}>
              {histories?.accreditations?.map(item => (
                <ResearcherAccreditationEntry data={item} />
              ))}
            </HistoriesSection>
          </FormSection>
          <FormSection heading={tProfile("education")}>
            <HistoriesSection
              type="education"
              count={histories?.education?.length}>
              {histories?.education?.map(item => (
                <ResearcherEducationEntry data={item} />
              ))}
            </HistoriesSection>
          </FormSection>
          <FormSection heading={tProfile("employment")}>
            <FileUploadDetails
              fileButtonText={tProfile("uploadCv")}
              fileHref={getFileHref(latestCV?.name)}
              fileType={FileType.CV}
              fileNameText={file?.name || tProfile("noCvUploaded")}
              isSizeInvalid={isSizeInvalid}
              isScanning={isScanning}
              isScanComplete={isScanComplete}
              isScanFailed={isScanFailed}
              isUploading={isUploading}
              onFileChange={handleFileChange}
            />
            <EmploymentsForm onSubmit={onSubmit} />
            <HistoriesSection
              type="employments"
              count={histories?.employments?.length}>
              {histories?.employments?.map(item => (
                <ResearcherEmploymentEntry data={item} />
              ))}
            </HistoriesSection>
          </FormSection>
          <PageSection sx={{ display: "flex", justifyContent: "flex-end", pr: "16px" }}>
            <Button
              sx={{ display: "flex", justifySelf: "flex-end" }}
              endIcon={<EastIcon />}
              onClick={() =>
                router.push(ROUTES.profileResearcherTraining.path)
              }>
              {tProfile("continueLinkText")}
            </Button>
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
