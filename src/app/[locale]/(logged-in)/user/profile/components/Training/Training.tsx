import { useStore } from "@/data/store";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { TrashIcon } from "@/consts/icons";
import useFileDownload from "@/hooks/useFileDownload";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import {
  deleteTrainingQuery,
  getTrainingByRegistryIdQuery,
} from "@/services/trainings";
import postTrainingsQuery from "@/services/trainings/postTrainingsQuery";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { ResearcherTraining } from "@/types/application";
import { formatShortDate } from "@/utils/date";
import { showAlert } from "@/utils/showAlert";
import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import TrainingForm from "./TrainingForm";

const NAMESPACE_TRANSLATION_PROFILE = "Training";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Training() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const user = useStore(store => store.config.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const [fileIdToDownload, setFileIdToDownload] = useState<
    number | undefined
  >();
  const { downloadFile: fileDownload } = useFileDownload(fileIdToDownload);

  const downloadFile = useCallback((fileId: number) => {
    setFileIdToDownload(fileId);
  }, []);

  const {
    data: trainingsData,
    refetch: refetchTrainings,
    ...trainingDataQueryState
  } = useQuery({
    ...getTrainingByRegistryIdQuery(user?.registry_id),
    enabled: !!user?.registry_id,
  });

  const { mutateAsync: deleteTrainingAsync, ...deleteTrainingQueryState } =
    useMutation(deleteTrainingQuery());

  const showDeleteConfirm = useQueryConfirmAlerts<number>(
    deleteTrainingQueryState,
    {
      confirmAlertProps: {
        willClose: async (id: number) => {
          await deleteTrainingAsync(id);

          refetchTrainings();
        },
      },
    }
  );

  useEffect(() => {
    try {
      if (fileIdToDownload) {
        fileDownload();
        setFileIdToDownload(undefined);
      }
    } catch (_) {
      showAlert("error", {
        text: ReactDOMServer.renderToString(
          t.rich("fileDownloadError", {
            contactLink: ContactLink,
          })
        ),
        confirmButtonText: t("errorButton"),
      });
    }
  }, [fileIdToDownload, fileDownload]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const renderActions = (training: ResearcherTraining) => {
    const certificateFile = user?.registry?.files[0];

    return (
      <ActionMenu aria-label={`Actions for ${training.training_name}`}>
        <ActionMenuItem
          icon={<TaskAltIcon sx={{ color: "menuList1.main" }} />}
          sx={{ color: "menuList1.main" }}
          onClick={() => certificateFile && downloadFile(certificateFile.id)}
          disabled={!certificateFile}>
          {t("viewCertificate")}
        </ActionMenuItem>
        <ActionMenuItem
          icon={<TrashIcon />}
          sx={{ color: "error.main" }}
          onClick={() => {
            showDeleteConfirm(training.id);
          }}>
          {tApplication("delete")}
        </ActionMenuItem>
      </ActionMenu>
    );
  };

  const onSubmit = useCallback(
    async (training: PostTrainingsPayload) => {
      try {
        const histories = getHistories();
        const updatedHistories = {
          ...histories,
          training: [...histories.training, training],
        };
        if (updatedHistories) {
          setHistories(updatedHistories);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getHistories, setHistories]
  );
  const { mutateAsync, isPending, ...postTrainingsQueryState } = useMutation(
    postTrainingsQuery(user?.registry_id)
  );

  useQueryAlerts(postTrainingsQueryState, {
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        t.rich("postTrainingError", {
          contactLink: ContactLink,
        })
      ),
    },
    successAlertProps: {
      text: t("postTrainingSuccess"),
    },
  });

  const handleSubmit = useCallback(
    async (training: PostTrainingsPayload) => {
      await mutateAsync(training);
      await onSubmit(training);
      refetchTrainings();
      handleCloseModal();
    },
    [mutateAsync, onSubmit]
  );

  const columns = [
    {
      header: t("trainingHistoryColumnProvider"),
      accessorKey: "provider",
    },
    {
      header: t("trainingHistoryColumnName"),
      accessorKey: "training_name",
    },
    {
      header: t("trainingHistoryColumnAwardedAt"),
      accessorKey: "awarded_at",
      cell: ({ row }) => formatShortDate(row.original.awarded_at),
    },
    {
      header: t("trainingHistoryColumnExpiresAt"),
      accessorKey: "expires_at",
      cell: ({ row }) => formatShortDate(row.original.expires_at),
    },
    {
      header: "",
      accessorKey: "actions",
      cell: ({ row }) => renderActions(row.original),
    },
  ];
  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t("trainingHistoryTitle")}
      </Typography>

      <Table
        data={trainingsData?.data || []}
        columns={columns}
        queryState={trainingDataQueryState}
        total={trainingsData?.data.length}
        noResultsMessage={t("noResultsMessage")}
      />

      <Button
        onClick={handleOpenModal}
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mt: 2 }}>
        {t("addTrainingCourse")}
      </Button>

      <FormModal open={isModalOpen} title={t("addTrainingCourse")}>
        <TrainingForm
          onSubmit={handleSubmit}
          isPending={isPending}
          onCancel={handleCloseModal}
        />
      </FormModal>
    </>
  );
}
