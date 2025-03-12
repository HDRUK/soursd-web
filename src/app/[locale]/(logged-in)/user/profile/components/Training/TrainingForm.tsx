import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Form from "@/components/Form";
import FormControl from "@/components/FormControlWrapper";
import FormActions from "@/components/FormActions";
import ButtonSave from "@/components/ButtonSave";
import DateInput from "@/components/DateInput";
import { FileType, MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import yup from "@/config/yup";
import dayjs from "dayjs";
import { formatDBDate } from "@/utils/date";
import { PostTrainingsPayload } from "@/services/trainings/types";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { useStore } from "@/data/store";
import UploadIcon from "@mui/icons-material/Upload";
import { File as ApplicationFile } from "@/types/application";
import CertificateUploadModal from "./CertificateUploadModal";
import prettyBytes from "pretty-bytes";

const NAMESPACE_TRANSLATION_FORM_TRAINING = "Form.Training";
const NAMESPACE_TRANSLATION_FILE = "File";

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
  certification_upload?: ApplicationFile;
}
interface TrainingFormProps {
  onSubmit: (values: PostTrainingsPayload) => void;
  isPending: boolean;
  onCancel: () => void;
}

export default function TrainingForm({
  onSubmit,
  isPending,
  onCancel,
}: TrainingFormProps) {
  const tTraining = useTranslations(NAMESPACE_TRANSLATION_FORM_TRAINING);
  const tFile = useTranslations(NAMESPACE_TRANSLATION_FILE);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateYearsRemaining = (expirationDate: string): number => {
    const now = dayjs();
    const expiration = dayjs(expirationDate);
    if (!expiration.isValid() || expiration.isBefore(now)) {
      return 0;
    }
    return expiration.diff(now, "year", true);
  };

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload("certificationUploadFailed");

  const { setValue } = useForm();

  useEffect(() => {
    if (file) {
      setValue("certification_upload", file);
    }
  }, [file, setValue]);

  const uploadFile = useUserFileUpload({
    user,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const updatedUser = await uploadFile(e);
      if (updatedUser) setUser(updatedUser);
    },
    [user?.registry_id]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        provider: yup
          .string()
          .required(tTraining("trainingProviderRequiredInvalid")),
        training_name: yup
          .string()
          .required(tTraining("trainingNameRequiredInvalid")),
        awarded_at: yup
          .string()
          .required(tTraining("awardedAtRequiredInvalid"))
          .test("not-future", tTraining("awardedAtFutureInvalid"), value => {
            return (
              dayjs(value).isBefore(dayjs()) ||
              dayjs(value).isSame(dayjs(), "day")
            );
          }),
        expires_at: yup
          .string()
          .required(tTraining("expiresAtRequiredInvalid"))
          .test(
            "after-awarded",
            tTraining("expiresAtBeforeAwardedAtInvalid"),
            (value, context) => {
              const { awarded_at } = context.parent;
              return dayjs(value).isAfter(dayjs(awarded_at));
            }
          )
          .test("is-future", tTraining("expiresAtPastInvalid"), value => {
            return dayjs(value).isAfter(dayjs());
          }),
        certification_upload: yup.mixed(),
      }),
    [tTraining]
  );

  const formOptions = {
    defaultValues: {
      provider: "",
      training_name: "",
      awarded_at: "",
      expires_at: "",
    },
  };

  const handleSubmit = (fields: TrainingFormValues) => {
    const yearsRemaining = calculateYearsRemaining(fields.expires_at);
    const formattedFields = {
      ...fields,
      awarded_at: formatDBDate(fields.awarded_at),
      expires_at: formatDBDate(fields.expires_at),
      expires_in_years: yearsRemaining,
      certification_id: file?.id ?? null,
    };
    onSubmit(formattedFields);
  };

  const translationsMaxSize = {
    size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
  };

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      key={user?.id}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12} key="provider">
          <FormControl
            name="provider"
            label={tTraining("provider")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={12} key="training_name">
          <FormControl
            name="training_name"
            label={tTraining("trainingName")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <FormControl
                name="awarded_at"
                label={tTraining("awardedAt")}
                renderField={props => <DateInput {...props} />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                name="expires_at"
                label={tTraining("expiresAt")}
                renderField={props => <DateInput {...props} />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} key="certification_upload">
          <FormControl
            name="certification_upload"
            label={tTraining("certificationUpload")}
            description={
              <>
                <Box sx={{ mb: 1 }}>
                  Upload your training certificate to provide Data Custodians
                  with up-to-date information on mandatory training and
                  accreditations.
                </Box>
                <Box>
                  File types: PDF, Word
                  <br />
                  Max size: {tFile("maxSizeText", translationsMaxSize)} per file{" "}
                </Box>
              </>
            }
            renderField={props => (
              <>
                <Button
                  startIcon={<UploadIcon />}
                  variant="outlined"
                  onClick={handleOpenModal}>
                  {tTraining("uploadCertification")}
                </Button>
                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }} {...props}>
                    {file.name}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>

        <CertificateUploadModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleFileUpload}
          file={file}
          isSizeInvalid={isSizeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
        />
      </Grid>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onCancel} variant="outlined">
          {tTraining("cancel")}
        </Button>
        <ButtonSave type="submit" disabled={isPending} />
      </FormActions>
    </Form>
  );
}
