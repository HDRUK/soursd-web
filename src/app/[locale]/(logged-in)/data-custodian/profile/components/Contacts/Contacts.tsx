import ContactLink from "@/components/ContactLink";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import SearchBar from "@/modules/SearchBar";
import {
  deleteCustodianUser,
  getCustodianUsers,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { injectParamsIntoPath } from "@/utils/application";
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

export default function Contacts() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();
  const [modalProps, setModalProps] = useState<{
    open: boolean;
    user?: Partial<CustodianUser>;
  } | null>();
  const { custodian, routes } = useStore(state => ({
    custodian: state.getCustodian(),
    routes: state.getApplication().routes,
  }));

  const {
    isError: isGetCustodiansError,
    isLoading: isGetCustodiansLoading,
    data: custodiansData,
  } = useQuery({
    queryKey: ["getCustodianUsers", custodian?.id],
    queryFn: ({ queryKey }) => getCustodianUsers(queryKey[1]),
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
    <PageBodyContainer heading={t("contactsHeading")}>
      <PageBody>
        <PageSection>
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
              contactLink: ContactLink,
            })}
            queryState={{
              isLoading: isGetCustodiansLoading,
              isError: isGetCustodiansError,
            }}
            total={custodiansData?.data?.length}>
            {custodiansData?.data.map(custodianUser => {
              const {
                id,
                first_name,
                last_name,
                email,
                created_at,
                user_permissions,
              } = custodianUser;

              const role = user_permissions?.[0]?.permission?.name;

              return (
                <ResultsCard
                  key={email}
                  icon={
                    <Icon size="xlarge">
                      <PersonOutlineOutlinedIcon />
                    </Icon>
                  }
                  content={
                    <>
                      {" "}
                      <Typography
                        component={Link}
                        href={injectParamsIntoPath(
                          routes.profileCustodianUserById.path,
                          {
                            id,
                          }
                        )}
                        variant="h6">
                        {first_name} {last_name}
                      </Typography>
                      {/* Will be read from db */}
                      <Typography>{role && t(role)}</Typography>
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
                        color="inherit"
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
                        <DeleteForeverOutlinedIcon
                          sx={{ color: "error.main" }}
                        />
                      </IconButton>
                    </>
                  }
                />
              );
            })}
          </Results>
          {modalProps?.user && custodian?.id && (
            <UserModal
              {...modalProps}
              custodianId={custodian.id}
              onClose={handleCloseModal}
            />
          )}
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
