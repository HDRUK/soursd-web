import React, { useEffect } from "react";
import { List, Typography, Box } from "@mui/material";
import { Rule } from "../../types/rules";
import FormControlCheckbox from "../FormControlCheckbox";
import { StyledListItem, StyledListItemText } from "./CheckboxList.styles";
import SkeletonCheckboxList from "./Skeleton";

interface CheckboxListType {
  items: Rule[];
  isLoading?: boolean;
  title: string;
  checked: boolean[];
  setChecked: (checked: boolean[]) => void;
}

const CheckboxList = ({
  isLoading = false,
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
        {isLoading ? (
          <SkeletonCheckboxList />
        ) : (
          items.map((rule, index) => (
            <StyledListItem key={rule.id}>
              <FormControlCheckbox
                name={`checkbox-${rule.id}`}
                checked={checked[index] || false}
                onChange={handleChange(index)}
                value={rule.id}
                label={
                  <StyledListItemText
                    primary={<Typography>{rule.label}:</Typography>}
                    secondary={rule.text}
                  />
                }
              />
            </StyledListItem>
          ))
        )}
      </Box>
    </List>
  );
};

export default React.memo(CheckboxList);
