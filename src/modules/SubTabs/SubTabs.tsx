"use client";

import { Tabs, Tab } from "@mui/material";
import { Link } from "@/i18n/routing";
import { Option } from "@/types/common";

interface SubTabsProps {
  current: string | null;
  tabs: Option[];
}

export default function SubTabs({ tabs, current }: SubTabsProps) {
  const [firstTab] = tabs;
  const defaultValue = firstTab.value;
  return (
    <Tabs value={current || defaultValue}>
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
