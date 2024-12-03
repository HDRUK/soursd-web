import Icon from "@/components/Icon";
import Results from "@/components/Results";
import { FORMAT_SHORT_DATE } from "@/consts/date";
import { getIssuersUsers } from "@/services/issuer_users";
import { Search } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "use-intl";

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    error: errorMessage,
    isError: isGetIssuersError,
    isLoading: isGetIssuersLoading,
    data: issuersData,
  } = useQuery({
    queryKey: ["getIssuers"],
    queryFn: () => getIssuersUsers(),
  });

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <form role="search">
          <TextField
            hiddenLabel
            label="Search"
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="description for action">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Button endIcon={<AddCircleOutlineOutlinedIcon />} variant="contained">
          Add New
        </Button>
      </Box>

      <Results
        noResultsMessage={t("noResults")}
        errorMessage={t("getError")}
        queryState={{
          isLoading: isGetIssuersLoading,
          isError: isGetIssuersError,
        }}>
        {issuersData?.data.map(
          ({ first_name, last_name, created_at, email }) => (
            <Card sx={{ mb: 1 }} role="listitem" key={email}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    width: "100%",
                    gap: {
                      xs: 1,
                      md: 2,
                    },
                    alignItems: {
                      md: "center",
                    },
                  }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Icon size="xlarge">
                      <PersonOutlineOutlinedIcon />
                    </Icon>
                    <div>
                      <Typography variant="h6">
                        {first_name} {last_name}
                      </Typography>
                      <Typography>Administrator</Typography>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: {
                        md: "right",
                      },
                    }}>
                    <Typography color="caption.main">
                      Added on: {dayjs(created_at).format(FORMAT_SHORT_DATE)}
                    </Typography>
                    <Typography color="caption.main">
                      Last logged in: {dayjs().format(FORMAT_SHORT_DATE)}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" aria-label="Edit user">
                      <CreateOutlinedIcon sx={{ color: "default.main" }} />
                    </IconButton>
                    <IconButton size="small" aria-label="Delete user">
                      <DeleteForeverOutlinedIcon sx={{ color: "error.main" }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        )}
      </Results>
    </Box>
  );
}
