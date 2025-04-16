import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import AdministrativeContacts from "@/modules/AdministrativeContacts";
import SearchBar from "@/modules/SearchBar";
import { deleteCustodianUser } from "@/services/custodian_users";
import { usePaginatedCustodianUsers } from "@/services/custodians";
import { CustodianUser } from "@/types/application";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Box, Button, IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
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
  const custodian = useStore(state => state.getCustodian());

  const {
    data,
    page,
    total,
    last_page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = usePaginatedCustodianUsers(custodian?.id, {
    shouldUpdateQuerystring: true,
  });

  const { mutateAsync: deleteCustodianUserAsync, reset } = useMutation({
    mutationKey: ["deleteCustodianUser"],
    mutationFn: (id: number) => {
      return deleteCustodianUser(id, {
        error: { message: "deleteUserError" },
      });
    },
  });

  const renderActionMenuCell = (info: CellContext<CustodianUser, unknown>) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "flex-end",
        }}>
        <IconButton
          size="small"
          aria-label="Edit user"
          color="inherit"
          onClick={() =>
            setModalProps({
              open: true,
              user: info.row.original,
            })
          }>
          <CreateOutlinedIcon sx={{ color: "default.main" }} />
        </IconButton>
        <IconButton
          size="small"
          aria-label="Delete user"
          onClick={() => showModal(info.row.original.id)}>
          <DeleteForeverOutlinedIcon sx={{ color: "error.main" }} />
        </IconButton>
      </Box>
    );
  };

  const queryState = {
    isLoading,
    isError,
    isSuccess,
  };

  const showModal = useQueryConfirmAlerts(
    { ...queryState, reset },
    {
      confirmAlertProps: {
        text: t("deleteWarningDescription"),
        title: t("deleteWarningTitle"),
        confirmButtonText: "Delete user",
        cancelButtonText: "Cancel",
        // preConfirm: async id => {
        //   await deleteCustodianUserAsync(id as number);
        //   refetch();
        // },
      },
    }
  );

  const handleCloseModal = useCallback(() => {
    setModalProps(null);
  }, []);

  return (
    <PageBodyContainer heading={t("contactsHeading")}>
      <PageBody>
        <PageSection>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Box component="form" role="search" sx={{ flexGrow: 1 }}>
              <SearchBar
                onClear={resetQueryParams}
                onSearch={(text: string) => {
                  updateQueryParams({
                    "first_name[]": text,
                    "last_name[]": text,
                    "email[]": text,
                  });
                }}
                placeholder={t("searchPlaceholder")}
              />
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
          <AdministrativeContacts
            data={data || []}
            additionalColumns={[
              {
                accessorKey: "action",
                header: "",
                cell: renderActionMenuCell,
              },
            ]}
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            queryState={queryState}
            isPaginated
          />
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
