import { useStore } from "@/data/store";

import postTrainingsQuery from "@/services/trainings/postTrainingsQuery";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import FormModal from "@/components/FormModal";
import ContactLink from "@/components/ContactLink";
import Table from "@/components/Table";
import { formatShortDate } from "@/utils/date";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ResearcherTraining } from "@/types/application";
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import useFileDownload from "@/hooks/useFileDownload";
import { showAlert } from "@/utils/showAlert";
import {
  deleteTrainingQuery,
  getTrainingByRegistryIdQuery,
} from "@/services/trainings";
import AddIcon from "@mui/icons-material/Add";
import TrainingForm from "./TrainingForm";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { TrashIcon, VerifiedIcon } from "@/consts/icons";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";

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
