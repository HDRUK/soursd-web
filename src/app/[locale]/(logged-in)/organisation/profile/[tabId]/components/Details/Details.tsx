"use client";

import Guidance from "@/components/Guidance";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { FormControl, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function Details() {
  const user = useStore(state => state.getUser());

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  return (
    <Guidance {...mockedPersonalDetailsGuidanceProps}>
      <form>
        <Grid container rowSpacing={3} md={8}>
          <Grid item xs={12}>
            <FormControl disabled size="small" fullWidth>
              <TextField
                size="small"
                label={<>{tForm("firstName")}</>}
                value={user?.first_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl disabled size="small" fullWidth>
              <TextField
                size="small"
                label={<>{tForm("lastName")}</>}
                value={user?.last_name}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Guidance>
  );
}
