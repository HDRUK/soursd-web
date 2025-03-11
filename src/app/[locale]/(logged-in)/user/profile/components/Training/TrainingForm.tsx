import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Form from "@/components/Form";
import FormControl from "@/components/FormControlWrapper";
import FormActions from "@/components/FormActions";
import ButtonSave from "@/components/ButtonSave";
import DateInput from "@/components/DateInput";
import { FileType } from "@/consts/files";
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

const NAMESPACE_TRANSLATION_FORM = "Form.Training";

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
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
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
          .required(tForm("trainingProviderRequiredInvalid")),
        training_name: yup
          .string()
          .required(tForm("trainingNameRequiredInvalid")),
        awarded_at: yup
          .string()
          .required(tForm("awardedAtRequiredInvalid"))
          .test("not-future", tForm("awardedAtFutureInvalid"), value => {
            return (
              dayjs(value).isBefore(dayjs()) ||
              dayjs(value).isSame(dayjs(), "day")
            );
          }),
        expires_at: yup
          .string()
          .required(tForm("expiresAtRequiredInvalid"))
          .test(
            "after-awarded",
            tForm("expiresAtBeforeAwardedAtInvalid"),
            (value, context) => {
              const { awarded_at } = context.parent;
              return dayjs(value).isAfter(dayjs(awarded_at));
            }
          )
          .test("is-future", tForm("expiresAtPastInvalid"), value => {
            return dayjs(value).isAfter(dayjs());
          }),
        certification_upload: yup.mixed(),
      }),
    [tForm]
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
            label={tForm("provider")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={12} key="training_name">
          <FormControl
            name="training_name"
            label={tForm("trainingName")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={7} key="awarded_at">
          <FormControl
            name="awarded_at"
            label={tForm("awardedAt")}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
        <Grid item xs={7} key="expires_at">
          <FormControl
            name="expires_at"
            label={tForm("expiresAt")}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
        <Grid item xs={12} key="certification_upload">
          <FormControl
            name="certification_upload"
            label={tForm("certificationUpload")}
            renderField={props => (
              <>
                <Button
                  startIcon={<UploadIcon />}
                  variant="outlined"
                  onClick={handleOpenModal}>
                  {tForm("uploadCertification")}
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
          {tForm("cancel")}
        </Button>
        <ButtonSave type="submit" disabled={isPending} />
      </FormActions>
    </Form>
  );
}
