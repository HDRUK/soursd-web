import { Box, List, Typography } from "@mui/material";
import React from "react";
import { Rule } from "../../types/rules";
import CheckboxItem from "../CheckboxItem";
import SkeletonCheckboxList from "./Skeleton";

interface CheckboxListType {
  items: Rule[];
  isLoading?: boolean;
  title: string;
  checked: boolean[];
  setChecked: (checked: boolean[]) => void;
  onEdit?: (updatedRule: Rule) => Promise<void>;
  onEditTitle?: string;
  rightButton?: React.ReactNode;
}

const CheckboxList = ({
  isLoading = false,
  items,
  title,
  checked,
  setChecked,
  onEdit,
  onEditTitle,
  rightButton,
}: CheckboxListType) => {
  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = [...checked];
      newChecked[index] = event.target.checked;
      setChecked(newChecked);
    };

  return (
    <List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <Typography variant="h6">{title}</Typography>
        {rightButton && <Box>{rightButton}</Box>}
      </Box>
      <Box sx={{ bgcolor: "#f2f2f2", padding: 1, borderRadius: 1 }}>
        {isLoading ? (
          <SkeletonCheckboxList isLoading={isLoading} n={items?.length || 4} />
        ) : (
          items.map((rule, index) => (
            <CheckboxItem
              key={rule.id}
              item={rule}
              checked={checked[index] || false}
              onChange={handleChange(index)}
              onEdit={onEdit}
              heading={onEditTitle || ""}
            />
          ))
        )}
      </Box>
    </List>
  );
};

export default React.memo(CheckboxList);
