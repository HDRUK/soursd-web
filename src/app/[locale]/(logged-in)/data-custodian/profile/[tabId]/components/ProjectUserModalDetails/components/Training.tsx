import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { patchIssuerUser, postIssuerUser } from "@/services/issuer_users";
import {
  DataCustodianUser,
  ResearcherEmployment,
  ResearcherTraining,
} from "@/types/application";
import { ProjectUser } from "@/types/application";
import { Link } from "@mui/material";
import { showAlert } from "@/utils/showAlert";
import AccordionTitle from "@/components/AccordionTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import Text from "@/components/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Modal,
  ModalProps,
  Typography,
  useTheme,
} from "@mui/material";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  projectUser: ProjectUser;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_TRAINING = "TrainingDetails";

interface TrainingProps {
  training: ResearcherTraining[];
}

const Training = ({ training }: TrainingProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_TRAINING);
  return (
    <Accordion key={"user_training"}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`header`}>
        {t("title")}
      </AccordionSummary>
      <AccordionDetails>
        <Card>
          {/*<Typography variant="h6"> {employment.employer_name}</Typography>
          <Text startIcon={<PersonIcon />}>{employment.role}</Text>
          <Text startIcon={<AccessTimeIcon />}>
            {employment.from} - {employment.to}
          </Text>
          <Typography>
            <Link
              href={employment.ror}
              underline="hover"
              sx={{ color: "link" }}>
              {employment.ror}
            </Link>
          </Typography>*/}
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default Training;
