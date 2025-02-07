"use client";

import { Tabs, Tab, TabsProps } from "@mui/material";
import { Link } from "@/i18n/routing";
import { Option } from "@/types/common";

interface SubTabsProps extends TabsProps {
  current: string | null;
  tabs: Option[];
}

export default function SubTabs({ tabs, current, ...restProps }: SubTabsProps) {
  const [firstTab] = tabs;
  const defaultValue = firstTab.value;
  return (
    <Tabs value={current || defaultValue} {...restProps}>
      {tabs.map(({ label, value, href }) => (
        <Tab
          label={label}
          value={value}
          href={href}
          component={Link}
          iconPosition="start"
        />
      ))}
    </Tabs>
  );
}
