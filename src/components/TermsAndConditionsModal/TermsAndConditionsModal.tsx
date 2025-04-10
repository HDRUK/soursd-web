import { useState } from "react";
import { Typography, Button, Box, List } from "@mui/material";
import FormModal, { FormModalProps } from "@/components/FormModal";
import { useTranslations } from "next-intl";
import { termsItems } from "@/consts/termsAndConditions";
import { mockedTermsAndConditions } from "@/mocks/data/cms";
import {
  StyledListItemButton,
  StyledRadio,
  StyledListItemText,
} from "./TermsAndConditionsModal.styles";

export interface TermsAndConditionsModalProps
  extends Omit<FormModalProps, "children"> {
  onAccept: () => void;
  onDecline: () => void;
}

const NAMESPACE_TRANSLATION_TERMS = "TermsAndConditions";
type TermsKey = keyof typeof mockedTermsAndConditions;

export default function TermsAndConditionsModal({
  onAccept,
  onDecline,
  ...restProps
}: TermsAndConditionsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_TERMS);
  const [selectedItem, setSelectedItem] = useState<TermsKey>("acceptingTerms");

  const handleListItemClick = (item: TermsKey) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    const item = mockedTermsAndConditions[selectedItem];
    if (!item || !item.content) {
      return null;
    }
    return item.content;
  };

  return (
    <FormModal {...restProps} variant="content">
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
        }}>
        <Box
          sx={{
            width: "35%",
            borderRight: 1,
            borderColor: "divider",
            overflowY: "scroll",
          }}>
          <List component="nav" sx={{ py: 0 }}>
            {(termsItems as TermsKey[]).map(item => (
              <StyledListItemButton
                key={item}
                selected={selectedItem === item}
                onClick={() => handleListItemClick(item)}>
                <StyledRadio
                  checked={selectedItem === item}
                  onChange={() => handleListItemClick(item)}
                />
                <StyledListItemText
                  primary={t(item)}
                  isSelected={selectedItem === item}
                />
              </StyledListItemButton>
            ))}
          </List>
        </Box>
        <Box sx={{ width: "65%", p: 3, overflowY: "auto" }}>
          {/* This section is a placeholder until we have content sign off from legal team */}
          <>
            <Typography variant="h4" gutterBottom>
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
              {t("description")}
            </Typography>
            {renderContent()}
          </>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          px: 3,
          pb: 2,
        }}>
        <Box>
          <Button variant="outlined" onClick={onDecline} sx={{ mr: 1 }}>
            {t("decline")}
          </Button>
          <Button variant="contained" color="primary" onClick={onAccept}>
            {t("accept")}
          </Button>
        </Box>
      </Box>
    </FormModal>
  );
}
