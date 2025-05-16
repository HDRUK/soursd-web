import { MenuItem, Select, SelectProps } from "@mui/material";
import { Organisation } from "../../types/application";

export interface SelectDepartmentsProps {
  organisation?: Organisation;
}

const SelectDepartments = ({
  organisation,
  ...rest
}: SelectDepartmentsProps & SelectProps) => {
  if (!organisation) return null;
  const departments = organisation?.departments || [];

  const departmentOptions = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));

  return (
    <Select {...rest}>
      {departmentOptions?.map(({ label, value }) => (
        <MenuItem value={value} key={value} id={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectDepartments;
