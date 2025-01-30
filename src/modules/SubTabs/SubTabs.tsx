"use client";

import { Box, Tabs } from "@mui/material";
import { Link } from "@/i18n/routing";
import { Option } from "@/types/common";
import { StyledSubTab } from "./SubTabs.style";

interface SubTabsProps {
  current: string | null;
  tabs: Option[];
}

export default function SubTabs({ tabs, current }: SubTabsProps) {
  const [firstTab] = tabs;
  const defaultValue = firstTab.value;
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", my: 2 }}>
      <Tabs value={current || defaultValue}>
        {tabs.map(({ label, value, href }) => (
          <StyledSubTab
            label={label}
            value={value}
            href={href}
            component={Link}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
}
