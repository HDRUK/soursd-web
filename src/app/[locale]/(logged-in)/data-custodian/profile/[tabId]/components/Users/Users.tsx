import ApplicationLink from "@/components/ApplicationLink";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import { useStore } from "@/data/store";
import SearchBar from "@/modules/SearchBar";
import {
  deleteCustodianUser,
  getCustodianUsers,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { formatShortDate } from "@/utils/date";
import { showAlert, showLoadingAlertWithPromise } from "@/utils/showAlert";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import UserModal from "../UserModal";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();
  const [modalProps, setModalProps] = useState<{
    open: boolean;
    user?: Partial<CustodianUser>;
  } | null>();
  const custodian = useStore(state => state.getCustodian());

  const {
    isError: isGetCustodiansError,
    isLoading: isGetCustodiansLoading,
    data: custodiansData,
  } = useQuery({
    queryKey: ["getCustodianUsers", custodian?.id],
    queryFn: () => getCustodianUsers(),
  });

  const { mutateAsync: deleteCustodianUserAsync } = useMutation({
    mutationKey: ["deleteCustodianUser"],
    mutationFn: (id: number) => {
      return deleteCustodianUser(id, {
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
        showLoadingAlertWithPromise(deleteCustodianUserAsync(userId), {
          onSuccess: () => {
            queryClient.refetchQueries({
              queryKey: ["getCustodianUsers", custodian?.id],
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
          <SearchBar onSearch={() => {}} />
        </Box>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          variant="contained"
          onClick={() => {
            if (custodian?.id) {
              setModalProps({
                open: true,
                user: {
                  first_name: "",
                  last_name: "",
                  email: "",
                  custodian_id: custodian?.id,
                },
              });
            }
          }}>
          {t("addNewUser")}
        </Button>
      </Box>

      <Results
        noResultsMessage={t("noResults")}
        errorMessage={t.rich("getError", {
          applicationLink: ApplicationLink,
        })}
        queryState={{
          isLoading: isGetCustodiansLoading,
          isError: isGetCustodiansError,
        }}>
        {custodiansData?.data.map(custodianUser => {
          const { first_name, last_name, created_at } = custodianUser;

          return (
            <ResultsCard
              icon={
                <Icon size="xlarge">
                  <PersonOutlineOutlinedIcon />
                </Icon>
              }
              content={
                <>
                  {" "}
                  <Typography variant="h6">
                    {first_name} {last_name}
                  </Typography>
                  {/* Will be read from db */}
                  <Typography>Administrator</Typography>
                </>
              }
              details={
                <>
                  {" "}
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
                </>
              }
              actions={
                <>
                  <IconButton
                    size="small"
                    aria-label="Edit user"
                    onClick={() =>
                      setModalProps({
                        open: true,
                        user: custodianUser,
                      })
                    }>
                    <CreateOutlinedIcon sx={{ color: "default.main" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="Delete user"
                    onClick={() => handleDelete(custodianUser?.id)}>
                    <DeleteForeverOutlinedIcon sx={{ color: "error.main" }} />
                  </IconButton>
                </>
              }
            />
          );
        })}
      </Results>
      {modalProps?.user && (
        <UserModal {...modalProps} onClose={handleCloseModal} />
      )}
    </Box>
  );
}
