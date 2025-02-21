import { useState, ReactNode } from "react";
import { Button } from "@mui/material";
import FormModal from "../FormModal";
import LoadingWrapper from "../LoadingWrapper";
import { LoadingButton } from "@mui/lab";

interface ModalFormButtonProps {
  buttonText: string;
  formContent: (props: {
    closeModal: () => void;
    onSubmit?: () => void;
    isLoading?: boolean;
  }) => ReactNode;
  onSubmit?: () => void;
  isLoading?: boolean;
}

const ModalFormButton: React.FC<ModalFormButtonProps> = ({
  buttonText,
  formContent,
  onSubmit,
  isLoading = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <LoadingButton
        loading={isLoading}
        disabled={isLoading}
        variant="outlined"
        onClick={() => setOpen(true)}>
        {buttonText}
      </LoadingButton>

      <FormModal open={open} onClose={() => setOpen(false)}>
        {formContent({ closeModal: () => setOpen(false), onSubmit, isLoading })}
      </FormModal>
    </>
  );
};

export default ModalFormButton;
