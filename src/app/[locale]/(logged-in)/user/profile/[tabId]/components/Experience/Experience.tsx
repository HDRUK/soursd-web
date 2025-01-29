import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { File as AppFile } from "@/types/application";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import { useTranslations } from "next-intl";
import { PostEmploymentsPayload } from "@/services/employments/types";
import { getLatestCV, isFileScanning } from "@/utils/file";
import useFileScanned from "@/hooks/useFileScanned";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { useMutation } from "@tanstack/react-query";
import { MAX_UPLOAD_SIZE_BYTES, FileType } from "@/consts/files";
import { EntityType } from "@/types/api";
import { Message } from "@/components/Message";
import ContactLink from "@/components/ContactLink";
import postFileQuery from "@/services/files/postFileQuery";
import { ROUTES } from "@/consts/router";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import EastIcon from "@mui/icons-material/East";
import { Box } from "@mui/system";
import HistoriesSection from "../HistoriesSection";
import EmploymentsForm from "./EmploymentsForm";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);
  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);
  const router = useRouter();

  const latestCV = getLatestCV(user?.registry?.files || []);
  const { isNotInfected, isScanning } = useFileScanned(latestCV);

  const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
    options: { queryKey: ["getUser", user?.id] },
  });

  useEffect(() => {
    if (isFileScanning(latestCV)) {
      refetchUser();
    } else {
      refetchCancel();
    }

    return () => refetchCancel();
  }, [JSON.stringify(latestCV)]);

  const {
    mutateAsync: mutateFileAsync,
    isPending: isFileLoading,
    isError: isUploadError,
    error: uploadError,
  } = useMutation(postFileQuery());

  const handleFileChange = useCallback(
    async ({ target }: ChangeEvent<HTMLInputElement>) => {
      setIsFileSizeTooBig(false);

      if (!target.files || target.files.length === 0) {
        return;
      }

      const file = target.files[0];

      if (file.size <= MAX_UPLOAD_SIZE_BYTES) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file_type", FileType.CV);
        formData.append("entity_type", EntityType.RESEARCHER);
        formData.append("registry_id", `${user?.registry_id}`);

        try {
          const response = await mutateFileAsync(formData);
          const fileData = response.data;

          const newFile: AppFile = {
            id: fileData.id,
            name: fileData.name,
            status: fileData.status,
            type: FileType.CV,
            created_at: fileData.created_at,
            updated_at: fileData.updated_at,
          };

          const updatedUser = {
            ...user,
            registry: {
              ...user?.registry,
              files: [...(user?.registry?.files || []), newFile],
            },
          };

          setUser(updatedUser);
          refetchUser();
        } catch (_) {
          target.value = "";
        }
      } else {
        setIsFileSizeTooBig(true);
        target.value = "";
      }
    },
    [mutateFileAsync, setUser, refetchUser, user?.registry_id]
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
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
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
      <FormSection
        heading={tProfile("education")}
        sx={{ marginBottom: "16px" }}>
        <HistoriesSection type="education" count={histories?.education?.length}>
          {histories?.education?.map(item => (
            <ResearcherEducationEntry data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
      <FormSection heading={tProfile("employment")}>
        {isUploadError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {isUploadError &&
              tProfile.rich(`${uploadError}`, {
                contactLink: ContactLink,
              })}
          </Message>
        )}
        <FileUploadDetails
          fileType={FileType.CV}
          fileName={latestCV?.name || tProfile("noCvUploaded")}
          isFileSizeTooBig={isFileSizeTooBig}
          isFileScanning={isScanning}
          isFileOk={isNotInfected}
          isFileUploading={isFileLoading}
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <LoadingButton
          sx={{ display: "flex" }}
          endIcon={<EastIcon />}
          onClick={() => router.push(ROUTES.profileResearcherTraining.path)}>
          {tProfile("continueLinkText")}
        </LoadingButton>
      </Box>
    </PageGuidance>
  );
}
