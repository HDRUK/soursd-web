import { useStore } from "@/data/store";

import postTrainingsQuery from "@/services/trainings/postTrainingsQuery";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { showAlert } from "@/utils/showAlert";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ReactDOMServer from "react-dom/server";
import FormModal from "@/components/FormModal";
import TrainingForm from "./TrainingForm";
import ContactLink from "@/components/ContactLink";
import AddIcon from '@mui/icons-material/Add';
import { formatShortDate } from "@/utils/date";

const NAMESPACE_TRANSLATION_PROFILE = "Profile.Training";

export default function Training() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const user = useStore(store => store.config.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
    const {
    mutateAsync,
    isPending,
  } = useMutation(postTrainingsQuery(user?.registry_id));

  const handleSubmit = useCallback(
    async (training: PostTrainingsPayload) => {
      try {
        await mutateAsync(training);
        await onSubmit(training);
        showAlert("success", {
          text: t("postTrainingSuccess"),
          confirmButtonText: t("closeButton"),
        });
        handleCloseModal();
      } catch (_) {
        showAlert("error", {
          text: ReactDOMServer.renderToString(
            t.rich("postTrainingError", {
              contactLink: ContactLink,
            })
          ),
          confirmButtonText: t("errorButton"),
        });
      }
    },
    [mutateAsync, onSubmit, t]
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
            <TableCell scope="col">{t("trainingHistoryColumnProvider")}</TableCell>
            <TableCell scope="col">{t("trainingHistoryColumnName")}</TableCell>
            <TableCell scope="col">{t("trainingHistoryColumnAwardedAt")}</TableCell>
            <TableCell scope="col">{t("trainingHistoryColumnExpiresAt")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories?.training.map(({ training_name, provider, awarded_at, expires_at }) => (
            <TableRow key={provider}>
              <TableCell>{provider}</TableCell>
              <TableCell>{training_name}</TableCell>
              <TableCell>{formatShortDate(awarded_at)}</TableCell>
              <TableCell>{formatShortDate(expires_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
      <Button onClick={handleOpenModal} variant="outlined" color="primary"             
        startIcon={<AddIcon />}
        sx={{mt: 2}}
      >
        {t("addTrainingCourse")}
      </Button>

      <FormModal
        open={isModalOpen}
        title={t("addTrainingCourse")}
      >
        <TrainingForm
          onSubmit={handleSubmit}
          isPending={isPending}
          onCancel={handleCloseModal}
        />
      </FormModal>
   </>
  );
}
