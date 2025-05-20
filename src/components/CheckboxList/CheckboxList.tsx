import React from "react";
import { List, Typography, Box } from "@mui/material";
import { Rule } from "@/types/rules";
import SkeletonCheckboxList from "./Skeleton";
import CheckboxItem from "../CheckboxItem";

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
          <SkeletonCheckboxList n={items?.length} />
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
