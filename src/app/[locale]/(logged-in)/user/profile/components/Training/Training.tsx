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
import { useCallback, useState } from "react";
import ReactDOMServer from "react-dom/server";
import FormModal from "@/components/FormModal";
import ContactLink from "@/components/ContactLink";
import AddIcon from "@mui/icons-material/Add";
import { formatShortDate } from "@/utils/date";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import TrainingForm from "./TrainingForm";

const NAMESPACE_TRANSLATION_PROFILE = "Training";

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
            </TableRow>
          </TableHead>
          <TableBody>
            {histories?.training.map(
              ({ training_name, provider, awarded_at, expires_at }) => (
                <TableRow key={provider}>
                  <TableCell>{provider}</TableCell>
                  <TableCell>{training_name}</TableCell>
                  <TableCell>{formatShortDate(awarded_at)}</TableCell>
                  <TableCell>{formatShortDate(expires_at)}</TableCell>
                </TableRow>
              )
            )}
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

      <FormModal open={isModalOpen} heading={t("addTrainingCourse")}>
        <TrainingForm
          onSubmit={handleSubmit}
          isPending={isPending}
          onCancel={handleCloseModal}
        />
      </FormModal>
    </>
  );
}
