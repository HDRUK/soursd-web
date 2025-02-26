import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/BlockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StatusIndicator from "@/components/StatusIndicator";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { SvgIconProps } from "@mui/material";

const IdentityVerifiedIcon = (props: SvgIconProps) => (
  <ShieldOutlinedIcon {...props} sx={{ color: "default.main" }} />
);

const ApprovedUserIcon = (props: SvgIconProps) => (
  <TaskAltOutlinedIcon {...props} sx={{ color: "success.main" }} />
);

const ApprovedTrainingIcon = (props: SvgIconProps) => (
  <WorkspacePremiumOutlinedIcon {...props} sx={{ color: "mint.main" }} />
);

const ApprovedIcon = (props: SvgIconProps) => (
  <StatusIndicator {...props} variant="success" size="large" />
);

const PendingIcon = (props: SvgIconProps) => (
  <StatusIndicator {...props} variant="error" size="large" />
);

const DecoupleIcon = (props: SvgIconProps) => (
  <BlockIcon {...props} sx={{ color: "error.main" }} />
);

const TrashIcon = (props: SvgIconProps) => (
  <DeleteIcon {...props} sx={{ color: "error.main" }} />
);

const EditIcon = (props: SvgIconProps) => (
  <ModeEditIcon {...props} sx={{ color: "default.main" }} />
);

const OrganisationIcon = (props: SvgIconProps) => <BusinessIcon {...props} />;

export {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
  DecoupleIcon,
  TrashIcon,
  EditIcon,
  OrganisationIcon,
};
