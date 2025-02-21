import { useState, ReactNode } from "react";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import FormModal from "../FormModal";

import { LoadingButton } from "@mui/lab";

interface ModalFormButtonProps {
  buttonText?: string;
  formContent: (props: {
    closeModal: () => void;
    onSubmit?: () => void;
    isLoading?: boolean;
  }) => ReactNode;
  onSubmit?: () => void;
  isLoading?: boolean;
  tooltipText?: string;
  icon?: ReactNode;
}

const ModalFormButton: React.FC<ModalFormButtonProps> = ({
  buttonText,
  formContent,
  onSubmit,
  isLoading = false,
  icon,
  tooltipText,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {icon ? (
        <Tooltip title={tooltipText || "Open Form"}>
          <IconButton
            disabled={isLoading}
            onClick={() => setOpen(true)}
            size="small"
            color="inherit"
            aria-label="icon-button">
            {isLoading ? <CircularProgress size={20} color="inherit" /> : icon}
          </IconButton>
        </Tooltip>
      ) : (
        <LoadingButton
          loading={isLoading}
          disabled={isLoading}
          variant="outlined"
          onClick={() => setOpen(true)}>
          {buttonText}
        </LoadingButton>
      )}

      <FormModal open={open} onClose={() => setOpen(false)}>
        {formContent({ closeModal: () => setOpen(false), onSubmit, isLoading })}
      </FormModal>
    </>
  );
};

export default ModalFormButton;
