import { BoxProps } from "@mui/material";
import { User } from "@/types/application";
export interface UserDetailsProps extends BoxProps {
    user: User;
}
export default function UserDetails({ user, ...restProps }: UserDetailsProps): import("react/jsx-runtime").JSX.Element;
