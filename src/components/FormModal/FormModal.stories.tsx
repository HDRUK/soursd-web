import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import FormModal, { FormModalProps } from ".";
import FormControlHorizontal from "../FormControlHorizontal";
import FormModalBody from "../FormModalBody";
import FormModalHeader from "../FormModalHeader";
import FormModalActions from "../FormModalActions";

const meta = {
  title: "components/FormModal",
  component: FormModal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicFormModal = ({ open }: FormModalProps) => {
  const [showFormModal, setShowFormModal] = useState(open);

  return showFormModal ? (
    <FormModal
      open={showFormModal}
      onClose={() => setShowFormModal(false)}
      sx={{ width: "600px" }}>
      <FormModalHeader>
        <Typography variant="h4">Profile</Typography>
        <Typography>
          This is where you fill in or edit your users details.
        </Typography>
      </FormModalHeader>
      <FormModalBody>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <FormControlHorizontal label="First name">
              <TextField id="firstName" />
            </FormControlHorizontal>
          </Grid>
          <Grid item xs={12}>
            <FormControlHorizontal label="Last name">
              <TextField id="lastName" />
            </FormControlHorizontal>
          </Grid>
          <Grid item xs={12}>
            <FormControlHorizontal label="Email">
              <TextField id="Email" />
            </FormControlHorizontal>
          </Grid>
        </Grid>
      </FormModalBody>
      <FormModalActions>
        <Button variant="contained">Save</Button>
      </FormModalActions>
    </FormModal>
  ) : (
    <Button onClick={() => setShowFormModal(true)}>Open modal</Button>
  );
};

export const Basic: Story = {
  args: { open: false, children: <>Form here</> },
  render: props => <BasicFormModal {...props} />,
};
