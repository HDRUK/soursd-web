import { toCamelCase } from "@/utils/string";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface FieldsToTextProps<T> {
  data: T;
  keys: (Extract<keyof T, string> | [string, JSX.Element])[];
  tKey: string;
}

export default function FieldsToText<T>({
  data,
  keys,
  tKey,
}: FieldsToTextProps<T>) {
  const t = useTranslations(tKey);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {keys
        .filter(key => Array.isArray(key) || !!data[key])
        .map(key =>
          Array.isArray(key) ? (
            <div>
              <Typography variant="h6">{t(toCamelCase(key[0]))}</Typography>
              {key[1]}
            </div>
          ) : (
            <div>
              <Typography variant="h6">{t(toCamelCase(key))}</Typography>
              <Typography>{data[key]}</Typography>
            </div>
          )
        )}
    </Box>
  );
}
