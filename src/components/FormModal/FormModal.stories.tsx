import type { Meta, StoryObj } from "@storybook/react";

import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import FormModal from ".";
import PasswordTextField from "../PasswordTextField";
import { FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "components/FormModal",
  component: FormModal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicFormModal = () => {
  const [showFormModal, setShowFormModal] = useState(false);
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
  args: { open: true, children: <>Form here</> },
  render: props => <BasicFormModal {...props} />,
};
