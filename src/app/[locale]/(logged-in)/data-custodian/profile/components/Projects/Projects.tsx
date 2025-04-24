import { AddIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import ProjectsList from "@/modules/Projects";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectCreateModal from "../ProjectCreateModal";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const custodianId = useStore(state => state.getCustodian()?.id);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ProjectCreateModal
        custodianId={custodianId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ProjectsList
        variant="custodian"
        actions={
          <Button startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            {t("addNewProjectButton")}
          </Button>
        }
      />
    </>
  );
}
