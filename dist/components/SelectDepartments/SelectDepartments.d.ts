import { Organisation } from "@/types/application";
import { SelectProps } from "@mui/material";
export interface SelectDepartmentsProps {
    organisation?: Organisation;
}
declare const SelectDepartments: ({ organisation, ...rest }: SelectDepartmentsProps & SelectProps) => import("react/jsx-runtime").JSX.Element | null;
export default SelectDepartments;
