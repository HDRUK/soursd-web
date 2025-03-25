import FormModal, { FormModalProps } from "@/components/FormModal";
import ProjectsAddUserForm from "../ProjectsAddUserForm";
import FormModalBody from "@/components/FormModalBody";
import FormActions from "@/components/FormActions";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useQueryAlerts from "@/hooks/useQueryAlerts";

type ProjectsSafePeopleModalProps = Omit<FormModalProps, "children">;

export default function ProjectsSafePeopleModal(
  props: ProjectsSafePeopleModalProps
) {
  const handleSave = () => {};

  // useQueryAlerts();

  return (
    <FormModal
      variant="content"
      heading="Add new team member"
      description="Here’s where you can add a team member to your project. If you can't find them or they're listed under the wrong Organisation, invite them here. If they already have a SOURSD account, they’ll be able to select the correct Organisation. Otherwise, they'll be prompted to register for a SOURSD account."
      {...props}>
      <FormModalBody>
        <ProjectsAddUserForm onSave={handleSave} />
      </FormModalBody>
      <FormActions>
        <LoadingButton>Done</LoadingButton>
      </FormActions>
    </FormModal>
  );
}
