import React, { useEffect, useState, useMemo } from "react";
import { List, Typography, Box, TextField } from "@mui/material";
import { Rule } from "@/types/rules";
import * as yup from "yup";
import Form from "@/components/Form";
import FormControl from "@/components/FormControlWrapper";
import FormActions from "@/components/FormActions";
import { LoadingButton } from "@mui/lab";
import { ActionMenu, ActionMenuItem } from "../ActionMenu";
import SkeletonCheckboxList from "./Skeleton";
import { StyledListItem, StyledListItemText } from "./CheckboxList.styles";
import FormControlCheckbox from "../FormControlCheckbox";
import FormModal from "../FormModal";

interface CheckboxListType {
  items: Rule[];
  isLoading?: boolean;
  title: string;
  checked: boolean[];
  setChecked: (checked: boolean[]) => void;
  onEdit?: (item: Partial<Rule>) => Promise<void>;
}

interface EditItemProps {
  item: Rule;
  onEdit: (item: Partial<Rule>) => Promise<void>;
}

const EditItem = ({ item, onEdit }: EditItemProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      text: yup
        .string()
        .required("Text is required")
        .max(255, "Max 255 characters"),
    });
  }, []);

  const defaultValues = useMemo(
    () => ({
      text: item.text,
    }),
    [item.text]
  );

  const handleSubmit = async (formData: Partial<Rule>) => {
    const payload = {
      id: item.id,
      ...formData,
    };
    await onEdit(payload);
    setOpenModal(false);
  };

  return (
    <ActionMenuItem
      sx={{ color: "menuList1.main" }}
      onClick={() => setOpenModal(true)}>
      Edit
      <FormModal
        sx={{
          minWidth: 600,
        }}
        open={openModal}
        onClose={(e: React.SyntheticEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenModal(false);
        }}>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}>
          <FormControl
            name="text"
            renderField={fieldProps => <TextField {...fieldProps} fullWidth />}
          />

          <FormActions>
            <LoadingButton
              variant="outlined"
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenModal(false);
              }}>
              Cancel
            </LoadingButton>
            <LoadingButton type="submit" variant="contained">
              Save
            </LoadingButton>
          </FormActions>
        </Form>
      </FormModal>
    </ActionMenuItem>
  );
};

const CheckboxList = ({
  isLoading = false,
  items,
  title,
  checked,
  setChecked,
  onEdit,
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
                    primary={
                      rule.label && <Typography>{rule.label}:</Typography>
                    }
                    secondary={rule.text}
                  />
                }
              />

              {onEdit && (
                <ActionMenu sx={{ ml: "auto" }}>
                  <EditItem item={rule} onEdit={onEdit} />
                </ActionMenu>
              )}
            </StyledListItem>
          ))
        )}
      </Box>
    </List>
  );
};

export default React.memo(CheckboxList);
