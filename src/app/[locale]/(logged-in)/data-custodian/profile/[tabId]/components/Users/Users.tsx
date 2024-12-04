import Icon from "@/components/Icon";
import Results from "@/components/Results";
import { useStore } from "@/data/store";
import { deleteIssuerUser, getIssuerUsers } from "@/services/issuer_users";
import { DataCustodianUser } from "@/types/application";
import { formatShortDate } from "@/utils/date";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import UserModal from "../UserModal";
import { showAlert, showLoadingAlertWithPromise } from "@/utils/showAlert";

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();
  const [modalProps, setModalProps] = useState<{
    open: Boolean;
    user?: Partial<DataCustodianUser>;
  } | null>();
  const issuer = useStore(state => state.getIssuer());

  const {
    isError: isGetIssuersError,
    isLoading: isGetIssuersLoading,
    data: issuersData,
  } = useQuery({
    queryKey: ["getIssuerUsers", issuer?.id],
    queryFn: () => getIssuerUsers(),
  });

  const { mutateAsync: deleteIssuerUserAsync } = useMutation({
    mutationKey: ["deleteIssuerUser"],
    mutationFn: (id: number) => {
      return deleteIssuerUser(id, {
        error: { message: "deleteUserError" },
      });
    },
  });

  const handleDelete = async (userId: number) => {
    showAlert("warning", {
      text: t("deleteWarningDescription"),
      title: t("deleteWarningTitle"),
      confirmButtonText: "Delete user",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true,
      preConfirm: () => {
        showLoadingAlertWithPromise(deleteIssuerUserAsync(userId), {
          onSuccess: () => {
            queryClient.refetchQueries({
              queryKey: ["getIssuerUsers", issuer?.id],
            });
          },
        });
      },
    });
  };

  const handleCloseModal = useCallback(() => {
    setModalProps(null);
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <Box component="form" role="search" sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            hiddenLabel
            label="Search"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label={t("searchIssuerUsers")}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          variant="contained"
          onClick={() => {
            if (issuer?.id) {
              setModalProps({
                open: true,
                user: {
                  first_name: "",
                  last_name: "",
                  email: "",
                  issuer_id: issuer?.id,
                },
              });
            }
          }}>
          {t("addNewUser")}
        </Button>
      </Box>

      <Results
        noResultsMessage={t("noResults")}
        errorMessage={t("getError")}
        queryState={{
          isLoading: isGetIssuersLoading,
          isError: isGetIssuersError,
        }}>
        {issuersData?.data.map(issuerUser => {
          const { first_name, last_name, created_at, email } = issuerUser;

          return (
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
                      {/* Will be read from db */}
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
                      {t("addedOn", {
                        date: formatShortDate(created_at),
                      })}
                    </Typography>
                    <Typography color="caption.main">
                      {t("lastLoggedIn", {
                        date: formatShortDate(),
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      aria-label="Edit user"
                      onClick={() =>
                        setModalProps({
                          open: true,
                          user: issuerUser,
                        })
                      }>
                      <CreateOutlinedIcon sx={{ color: "default.main" }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Delete user"
                      onClick={() => handleDelete(issuerUser?.id)}>
                      <DeleteForeverOutlinedIcon sx={{ color: "error.main" }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Results>
      {modalProps?.user && (
        <UserModal {...modalProps} onClose={handleCloseModal} />
      )}
    </Box>
  );
}
