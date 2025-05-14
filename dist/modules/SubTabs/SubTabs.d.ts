import { TabsProps } from "@mui/material";
import { Option } from "@/types/common";
interface SubTabsProps extends TabsProps {
    current: string | null;
    tabs: Option[];
}
export default function SubTabs({ tabs, current, ...restProps }: SubTabsProps): import("react/jsx-runtime").JSX.Element;
export {};
