"use client";

import SignupForm from "@/modules/SignupForm/SignupForm";
import { Card, CardContent, Modal, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Modal open onClose={() => router.replace("homepage")}>
      <Card
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          maxWidth: "400px",
          [theme.breakpoints.down("sm")]: {
            width: `calc(100% - ${theme.spacing(4)})`,
          },
        }}>
        <CardContent sx={{ p: 4 }}>
          <SignupForm onSubmit={() => {}} />
        </CardContent>
      </Card>
    </Modal>
  );
}
