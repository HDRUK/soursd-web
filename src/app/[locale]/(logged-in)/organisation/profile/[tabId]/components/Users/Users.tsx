"use client";

import { useStore } from "@/data/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

export default function Users() {
  const organisation = useStore(store => store.config.organisation);
  const filteredUsers = organisation?.registries.filter(({ user }) => !!user);

  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);

  return (
    <Table
      sx={{ tableLayout: "fixed" }}
      size="small"
      aria-label={t("tableSummary")}>
      <TableHead sx={{ background: grey["300"] }}>
        <TableRow>
          <TableCell>{t("emailHeading")}</TableCell>
          <TableCell>{t("firstNameHeading")}</TableCell>
          <TableCell>{t("lastNameHeading")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredUsers?.map(({ user: { email, first_name, last_name } }) => {
          return (
            <TableRow key={email}>
              <TableCell sx={{ wordBreak: "break-word" }}>{email}</TableCell>
              <TableCell sx={{ wordBreak: "break-word" }}>
                {first_name}
              </TableCell>
              <TableCell sx={{ wordBreak: "break-word" }}>
                {last_name}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
