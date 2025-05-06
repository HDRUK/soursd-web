import { PaginatedQueryReturn } from "@/hooks/usePaginatedQuery";
import SearchBar from "@/modules/SearchBar";
import { User } from "@/types/application";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

enum OrganisationUsersFilterKeys {
  STATUS = "status",
}

export interface OrganisationUsersFiltersProps
  extends Pick<
    PaginatedQueryReturn<User>,
    "updateQueryParams" | "resetQueryParams"
  > {
  includeFilters?: OrganisationUsersFilterKeys[];
}

export default function OrganisationUsersFilters({
  updateQueryParams,
  resetQueryParams,
  includeFilters = [OrganisationUsersFilterKeys.STATUS],
}: OrganisationUsersFiltersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [showPendingInvites, setShowPendingInvites] = useState(0);

  const hasFilter = (key: OrganisationUsersFilterKeys) => {
    return includeFilters.includes(key);
  };

  return (
    <Box component="form" role="search" sx={{ display: "flex" }}>
      <SearchBar
        onClear={() => resetQueryParams({ show_pending: showPendingInvites })}
        onSearch={(text: string) => {
          updateQueryParams({
            "first_name[]": text,
            "last_name[]": text,
            "email[]": text,
          });
        }}
      />
      {hasFilter(OrganisationUsersFilterKeys.STATUS) && (
        <FormControlLabel
          label={t("showPendingInvites")}
          control={
            <Checkbox
              value={showPendingInvites}
              onChange={event => {
                const showPending = event.target.checked ? 1 : 0;

                setShowPendingInvites(showPending);
                updateQueryParams({
                  show_pending: showPending,
                });
              }}
            />
          }
        />
      )}
    </Box>
  );
}
