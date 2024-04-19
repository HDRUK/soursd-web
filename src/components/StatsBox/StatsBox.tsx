"use client";

import {
  Box,
  CardActions,
  CardContent,
  Divider,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ReactNode } from "react";

export interface StatsBoxProps extends PaperProps {
  footer?: string;
  footerProps?: TypographyProps;
  description?: string;
  descriptionProps?: TypographyProps;
  value?: string;
  valueProps?: TypographyProps;
  icon?: ReactNode;
}

export default function StatsBox({
  value,
  footer,
  footerProps,
  description,
  descriptionProps,
  valueProps,
  icon,
  color = "default",
  elevation = 0,
  ...restProps
}: StatsBoxProps) {
  return (
    <Paper
      elevation={elevation}
      color={color}
      aria-roledescription="statistic"
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
      }}>
      <CardContent sx={{ display: "flex", flexGrow: 1, gap: 5 }}>
        {icon && <div>{icon}</div>}
        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
          <Typography
            variant="subtitle2"
            lineHeight="1.4em"
            component="div"
            {...descriptionProps}>
            {description}
          </Typography>
          <Typography fontWeight="bold" variant="h6" {...valueProps}>
            {value}
          </Typography>
        </Box>
      </CardContent>

      {footer && (
        <>
          {" "}
          <Divider color={color} gradient />
          <CardActions>
            <Typography
              variant="caption"
              lineHeight="1.25em"
              component="div"
              {...footerProps}>
              {footer}
            </Typography>
          </CardActions>
        </>
      )}
    </Paper>
  );
}
