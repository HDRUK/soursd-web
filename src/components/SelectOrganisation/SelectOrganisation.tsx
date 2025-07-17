import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useMemo } from "react";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";

import { SelectProps } from "@mui/material";

export interface SelectOrganisationProps {
  onChange?: (event: SelectChangeEvent) => void;
}

export default function SelectOrganisation({
  onChange,
  ...fieldProps
}: SelectOrganisationProps & SelectProps) {
  const { data: organisationsData } = useOrganisationsQuery();

  const hydratedOrganisationMenu = useMemo(
    () =>
      (organisationsData ?? []).map(
        (org: { organisation_name: string; id: string }) => (
          <MenuItem value={org.id} key={org.id} id={org.organisation_name}>
            {org.organisation_name}
          </MenuItem>
        )
      ),
    [organisationsData]
  );

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event);
  };

  return (
    <Select onChange={e => handleChange(e)} {...fieldProps}>
      {hydratedOrganisationMenu}
    </Select>
  );
}
