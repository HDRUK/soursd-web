import { css, styled } from "@mui/material";

export const StyledFeatureArea = styled("div")(
  ({ theme }) => css`
    background: #7446f8;
    position: relative;
    padding: 20px ${theme.spacing(8)} ${theme.spacing(10)};

    :before,
    :after {
      content: "";
      position: absolute;
      background-size: cover;
      width: 100%;
      top: -150px;
      height: 165px;
      left: 0;
    }

    :before {
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzBCMTY0OSIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCw5Nkw0OCw4NS4zQzk2LDc1LDE5Miw1MywyODgsMzcuM0MzODQsMjEsNDgwLDExLDU3Niw0OEM2NzIsODUsNzY4LDE3MSw4NjQsMjA4Qzk2MCwyNDUsMTA1NiwyMzUsMTE1MiwyMTMuM0MxMjQ4LDE5MiwxMzQ0LDE2MCwxMzkyLDE0NEwxNDQwLDEyOEwxNDQwLDMyMEwxMzkyLDMyMEMxMzQ0LDMyMCwxMjQ4LDMyMCwxMTUyLDMyMEMxMDU2LDMyMCw5NjAsMzIwLDg2NCwzMjBDNzY4LDMyMCw2NzIsMzIwLDU3NiwzMjBDNDgwLDMyMCwzODQsMzIwLDI4OCwzMjBDMTkyLDMyMCw5NiwzMjAsNDgsMzIwTDAsMzIwWiI+PC9wYXRoPjwvc3ZnPg==");
    }

    :after {
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzc1NDZmOCIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCwxMjhMODAsMTQ0QzE2MCwxNjAsMzIwLDE5Miw0ODAsMTgxLjNDNjQwLDE3MSw4MDAsMTE3LDk2MCw5MC43QzExMjAsNjQsMTI4MCw2NCwxMzYwLDY0TDE0NDAsNjRMMTQ0MCwzMjBMMTM2MCwzMjBDMTI4MCwzMjAsMTEyMCwzMjAsOTYwLDMyMEM4MDAsMzIwLDY0MCwzMjAsNDgwLDMyMEMzMjAsMzIwLDE2MCwzMjAsODAsMzIwTDAsMzIwWiI+PC9wYXRoPjwvc3ZnPg==");
    }
  `
);

export const StyledLinks = styled("footer")(
  ({ theme }) => css`
    width: 100%;
    background: #0a1649;
    padding: ${theme.spacing(10)} ${theme.spacing(20)};
    position: relative;
    color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    gap: ${theme.spacing(15)};
  `
);
