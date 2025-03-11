import StatusIndicator from "@/components/StatusIndicator";
import BlockIcon from "@mui/icons-material/BlockOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/Star";
import { SvgIconProps } from "@mui/material";
import { yellow } from "@mui/material/colors";

const IdentityVerifiedIcon = (props: SvgIconProps) => {
  const { sx, ...restProps } = props;

  return (
    <ShieldOutlinedIcon {...restProps} sx={{ color: "default.main", ...sx }} />
  );
};

const VerifyIcon = (props: SvgIconProps) => {
  const { sx, ...restProps } = props;

  return (
    <VerifiedUserOutlinedIcon
      {...restProps}
      sx={{ color: "primary.main", ...sx }}
    />
  );
};

const RejectIcon = (props: SvgIconProps) => {
  const { sx, ...restProps } = props;

  return (
    <GppBadOutlinedIcon {...restProps} sx={{ color: "primary.main", ...sx }} />
  );
};

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

const FilterIcon = (props: SvgIconProps) => <FilterAltIcon {...props} />;

const PrimaryContactIcon = (props: SvgIconProps) => (
  <StarIcon sx={{ color: yellow["700"] }} {...props} />
);

export {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  DecoupleIcon,
  EditIcon,
  FilterIcon,
  IdentityVerifiedIcon,
  OrganisationIcon,
  PendingIcon,
  RejectIcon,
  TrashIcon,
  VerifyIcon,
  PrimaryContactIcon,
};
