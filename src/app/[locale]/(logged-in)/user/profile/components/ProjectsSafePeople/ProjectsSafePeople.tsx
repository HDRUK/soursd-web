import Table from "@/components/Table";
import { FilterIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import useProjectUsersQuery from "@/services/projects/getProjectUsersQuery";
import { Organisation, ProjectUser, User } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import { Box } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface ProjectsSafePeopleProps {
  id: number;
}

type FilteredUser = User & Pick<Organisation, "organisation_name">;

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProjectsSafePeople({ id }: ProjectsSafePeopleProps) {
  return (
    <>
      Subpage for Safe People for Project {id}
    </>
  );
}
