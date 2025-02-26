import { Box, BoxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ReactElement } from "react";

interface ActionListProps extends BoxProps {
  children: ReactElement | JSX.Element[];
  variant?: "striped" | "plain";
  stripedProps?: {
    evenBackground: string;
    evenColor: string;
    oddBackground: string;
    oddColor: string;
  };
}

export default function ActionList({
  children,
  variant = "striped",
  stripedProps = {
    evenBackground: grey["300"],
    evenColor: grey["800"],
    oddBackground: "inherit",
    oddColor: "inherit",
  },
  sx,
}: ActionListProps) {
  return (
    <Box component="ul" sx={{ listStyleType: "none", p: 0, m: 0, ...sx }}>
      {variant === "striped"
        ? React.Children.map(children, (child, i) => {
            if (React.isValidElement<BoxProps>(child)) {
              return React.cloneElement<BoxProps>(child, {
                sx: {
                  backgroundColor:
                    i % 2 === 0
                      ? stripedProps.evenBackground
                      : stripedProps.oddBackground,
                  color:
                    i % 2 === 0
                      ? stripedProps.evenColor
                      : stripedProps.oddColor,
                },
              });
            }

            return child;
          })
        : children}
    </Box>
  );
}
