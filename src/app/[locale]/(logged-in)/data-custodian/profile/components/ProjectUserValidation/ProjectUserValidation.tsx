import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelValidationChecks from "@/components/ActionsPanelValidationChecks";
import { RejectIcon, VerifyIcon } from "@/consts/icons";
import { Link } from "@/i18n/routing";
import { Button } from "@mui/material";
import { useStore } from "@/data/store";

interface ProjectUserValidationProps {
  userId: number;
}

const ProjectUserValidation = ({ userId }: ProjectUserValidationProps) => {
  console.log("hello", userId);
  return (
    <ActionsPanel heading="Validation Checks">
      <ActionsPanelValidationChecks
        heading="Has all Network mandatory training and awareness been completed"
        history={[
          {
            heading: "Mike Doe (custodian), 2 days ago",
            description: "Here is that attachment",
            actions: <Link href="#">Attachment</Link>,
          },
          {
            heading: "Patrick Nash (User), 3 days ago",
            description: "Detail of the comment here",
            actions: <Link href="#">Attachment</Link>,
          },
          {
            heading: "Patrick Nash (User), 3 days ago",
            description: "Detail of the comment here",
            actions: <Link href="#">Attachment</Link>,
          },
        ]}
        actions={
          <>
            <Button
              variant="outlined"
              startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
              Pass
            </Button>
            <Button variant="outlined" startIcon={<RejectIcon />}>
              Fail
            </Button>
            <Button variant="outlined">&#8230;</Button>
          </>
        }
      />
    </ActionsPanel>
  );
};

export { ProjectUserValidation };
