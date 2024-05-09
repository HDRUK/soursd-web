import type { Meta, StoryObj } from "@storybook/react";

import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormModal, { FormModalProps } from ".";
import PasswordTextField from "../PasswordTextField";

const meta = {
  title: "components/FormModal",
  component: FormModal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicFormModal = ({ open }: FormModalProps) => {
  const [showFormModal, setShowFormModal] = useState(open);
  const methods = useForm();

  return showFormModal ? (
    <FormModal open={showFormModal} onClose={() => setShowFormModal(false)}>
      <FormProvider {...methods}>
        <form>
          <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
            Sign up
          </Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <PasswordTextField
                label="Password"
                iconButtonProps={{ "aria-label": "password" }}
                fullWidth
                size="small"
                variant="outlined"
                id="password"
              />
            </Grid>
            <Grid item>
              <PasswordTextField
                label="Confirm password"
                iconButtonProps={{ "aria-label": "confirm password" }}
                fullWidth
                size="small"
                variant="outlined"
                id="confirmPassword"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </FormModal>
  ) : (
    <Button onClick={() => setShowFormModal(true)}>Open modal</Button>
  );
};

export const Basic: Story = {
  args: { open: false, children: <>Form here</> },
  render: props => <BasicFormModal {...props} />,
};
