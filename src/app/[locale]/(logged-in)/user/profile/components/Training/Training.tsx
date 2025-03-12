import { useStore } from "@/data/store";

import postTrainingsQuery from "@/services/trainings/postTrainingsQuery";
import { PostTrainingsPayload } from "@/services/trainings/types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import FormModal from "@/components/FormModal";
import ContactLink from "@/components/ContactLink";
import AddIcon from "@mui/icons-material/Add";
import { formatShortDate } from "@/utils/date";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ResearcherTraining } from "@/types/application";
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import useFileDownload from "@/hooks/useFileDownload";
import { showAlert } from "@/utils/showAlert";
import TrainingForm from "./TrainingForm";

const NAMESPACE_TRANSLATION_PROFILE = "Training";

export default function Training() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const user = useStore(store => store.config.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const [fileIdToDownload, setFileIdToDownload] = useState<
    number | undefined
  >();
  const { downloadFile: fileDownload } = useFileDownload(fileIdToDownload);

  const downloadFile = useCallback((fileId: number) => {
    setFileIdToDownload(fileId);
  }, []);

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
      handleCloseModal();
    },
    [mutateAsync, onSubmit]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t("trainingHistoryTitle")}
      </Typography>
      {!!histories?.training.length && (
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell scope="col">
                {t("trainingHistoryColumnProvider")}
              </TableCell>
              <TableCell scope="col">
                {t("trainingHistoryColumnName")}
              </TableCell>
              <TableCell scope="col">
                {t("trainingHistoryColumnAwardedAt")}
              </TableCell>
              <TableCell scope="col">
                {t("trainingHistoryColumnExpiresAt")}
              </TableCell>
              <TableCell scope="col" />
            </TableRow>
          </TableHead>
          <TableBody>
            {histories?.training.map(training => {
              const { training_name, provider, awarded_at, expires_at } =
                training;
              return (
                <TableRow key={provider}>
                  <TableCell>{provider}</TableCell>
                  <TableCell>{training_name}</TableCell>
                  <TableCell>{formatShortDate(awarded_at)}</TableCell>
                  <TableCell>{formatShortDate(expires_at)}</TableCell>
                  <TableCell>{renderActions(training)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
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
