import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { Rule } from "@/types/rules";
import FormControlCheckbox from "../FormControlCheckbox";

interface CheckboxListType {
  items: Rule[];
  title: string;
  checked: boolean[];
  setChecked: (checked: boolean[]) => void;
}

const CheckboxList = ({
  items,
  title,
  checked,
  setChecked,
}: CheckboxListType) => {
  useEffect(() => {}, [title, checked]);
  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = [...checked];
      newChecked[index] = event.target.checked;
      setChecked(newChecked);
    };

  return (
    <List>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ bgcolor: "#f2f2f2", padding: 1, borderRadius: 1 }}>
        {items.map((rule, index) => (
          <ListItem
            key={rule.id}
            sx={{
              borderBottom:
                index !== items.length - 1 ? "1px solid #ddd" : "none",
              bgcolor: "white",
              borderRadius: 1,
              mt: index !== 0 ? 1 : 0,
            }}>
            <FormControlCheckbox
              name={`checkbox-${rule.id}`}
              checked={checked[index] || false}
              onChange={handleChange(index)}
              value={rule.id}
              label={
                <ListItemText
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  primary={
                    <Typography fontWeight="bold">{rule.label}:</Typography>
                  }
                  secondary={rule.text}
                />
              }
            />
          </ListItem>
        ))}
      </Box>
    </List>
  );
};

export default React.memo(CheckboxList);
