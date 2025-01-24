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
import { FilePayload, postFile } from "@/services/files";
import { useMutation } from "@tanstack/react-query";
import { MAX_UPLOAD_SIZE_BYTES, FileType } from "@/consts/files";
import { EntityType } from "@/types/api";
import DetailsCV from "../DetailsCV";
import EmploymentsForm from "./EmploymentsForm";
import HistoriesSection from "../HistoriesSection";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);
  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

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

  const { mutateAsync: mutateFileAsync, isPending: isFileLoading } =
    useMutation({
      mutationKey: ["postFile"],
      mutationFn: (payload: FilePayload) => {
        return postFile(payload, {
          error: { message: "cvUploadFailed" },
        });
      },
    });

  const handleFileChange = useCallback(
    async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setIsFileSizeTooBig(false);
      if (files?.[0]) {
        if (files[0].size <= MAX_UPLOAD_SIZE_BYTES) {
          const file = new FormData();
          file.append("file", files[0]);
          file.append("file_type", FileType.CV);
          file.append("entity_type", EntityType.RESEARCHER);
          file.append("registry_id", `${user?.id}`);
          const response = await mutateFileAsync(file);

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
        } else {
          setIsFileSizeTooBig(true);
        }
      }
    },
    [mutateFileAsync, setUser, refetchUser]
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
        <DetailsCV
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
    </PageGuidance>
  );
}
