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
  color,
  elevation = 0,
  ...restProps
}: StatsBoxProps) {
  return (
    <Paper
      elevation={elevation}
      aria-roledescription="statistic"
      color={color}
      {...restProps}
      sx={{
        flexBasis: "100%",
        ...restProps.sx,
        margin: "10px",
        borderRadius: "10px",
      }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {icon && <div>{icon}</div>}
        <Box>
          <Typography fontWeight="bold" variant="h6" {...valueProps}>
            {value}
          </Typography>
          <Typography
            variant="subtitle2"
            lineHeight="1.4em"
            component="div"
            {...descriptionProps}>
            {description}
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
