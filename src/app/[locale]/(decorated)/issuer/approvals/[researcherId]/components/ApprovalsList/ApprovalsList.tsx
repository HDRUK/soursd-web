"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export default function PermissionsList() {
  const params = useParams<{ researcherId: string }>();
  const researcherId = params?.researcherId;

  const {
    isError: isGetMetadataError,
    isLoading: isGetMetadataLoading,
    data: metadataData,
    error: metadataError,
  } = useQuery(
    ["getPermissions", researcherId],
    async () =>
      getApprovals(researcherId || "", {
        error: { message: "getMetadata" },
      }),
    {
      enabled: !!researcherId,
    }
  );

  if (isGetMetadataLoading) {
    return (
      <OverlayCenter>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (isGetMetadataError) {
    return (
      <Alert color="error" sx={{ mb: 3 }}>
        {tSignup.rich(metadataError, {
          contactLink: ContactLink,
        })}
      </Alert>
    );
  }

  if (!isGetMetadataLoading && metadataData) {
    return (
      <Alert color="error" sx={{ mb: 3 }}>
        {tSignup.rich(metadataError, {
          contactLink: ContactLink,
        })}
      </Alert>
    );
  }

  return (
    <section>
      {!isGetMetadataError &&
        !(
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Label"
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Required"
            />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Disabled"
            />
          </FormGroup>
        )}
    </section>
  );
}
