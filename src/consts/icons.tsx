import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SquareIcon from "@mui/icons-material/Square";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
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
  <SquareIcon {...props} sx={{ color: "success.main" }} />
);

const PendingIcon = (props: SvgIconProps) => (
  <SquareIcon {...props} sx={{ color: "error.main" }} />
);

export {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
};
