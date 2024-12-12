import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { patchIssuerUser, postIssuerUser } from "@/services/issuer_users";
import { DataCustodianUser, ResearcherEmployment } from "@/types/application";
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Text from "@/components/Text";
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
import Employment from "./components/Employment";
import Education from "./components/Education";
import Training from "./components/Training";
import Accreditations from "./components/Accreditations";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  projectUser: ProjectUser;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function UserModalDetails({
  projectUser,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const theme = useTheme();
  const mobileMediaQuery = theme.breakpoints.down("sm");

  const { registry, role } = projectUser;
  const {
    user,
    accreditations,
    organisations,
    employment,
    education,
    training,
  } = registry;

  return (
    <FormModal variant="content" {...restProps}>
      <Box>
        <Typography variant="h5" sx={{ py: 2 }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Text startIcon={<EmailIcon />}>
          <Link
            href={`mailto:${user.email}`}
            underline="hover"
            sx={{ color: "link" }}>
            {user.email}
          </Link>
        </Text>
        <Text startIcon={<CorporateFareIcon />}>
          {employment?.employer_name}
        </Text>
        <Box sx={{ my: 2 }}>
          {employment && <Employment employment={employment} />}
        </Box>
        <Box sx={{ my: 2 }}>
          {education && <Education education={education} />}
        </Box>
        <Box sx={{ my: 2 }}>{training && <Training training={training} />}</Box>
        <Box sx={{ my: 2 }}>
          {accreditations && <Accreditations accreditations={accreditations} />}
        </Box>
      </Box>
    </FormModal>
  );
}
