import { RuleName, RuleState } from "@/types/rules";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface RulesCheckProps {
  rules: RuleState[];
}

const NAMESPACE_TRANSLATION = "Rules";

export default function RulesCheck({ rules }: RulesCheckProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const formattedRules = useMemo(() => {
    if (!rules?.length) return {};

    return rules.reduce(
      (acc, currentValue) => {
        const ruleName = currentValue?.failed_rules?.rule || currentValue.rule;

        if (ruleName) {
          if (!acc[ruleName]) {
            acc[ruleName] = {
              passed: true,
            };
          }

          if (
            currentValue.passed === false ||
            currentValue?.failed_rules?.status === "failed"
          ) {
            acc[ruleName] = {
              passed: false,
            };
          }
        }

        return acc;
      },
      {} as Record<RuleName, { passed: boolean }>
    );
  }, [rules]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
      }}>
      {Object.keys(formattedRules).map(key => {
        const { passed } = formattedRules[key as RuleName];

        return (
          <div>
            <Typography fontWeight={600}>{t(key)}</Typography>
            <Typography
              color={passed ? "success.main" : "error.main"}
              fontWeight={600}>
              {passed ? t("passed") : t("failed")}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
}
