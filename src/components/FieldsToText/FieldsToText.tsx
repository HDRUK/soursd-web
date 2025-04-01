import { toCamelCase } from "@/utils/string";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

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

  const filteredKeys = useMemo(() => {
    return keys.filter(key => {
      if (Array.isArray(data[key])) {
        return !!data[key].length;
      }

      return Array.isArray(key) || !!data[key];
    });
  }, [data]);

  const renderItems = (items: string | string[] | undefined) => {
    if (Array.isArray(items)) {
      return <ul>{items?.map((value: string) => <li>{value}</li>)}</ul>;
    }

    return items;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {filteredKeys.map(key =>
        Array.isArray(key) ? (
          <div>
            <Typography variant="h6">{t(toCamelCase(key[0]))}</Typography>
            {key[1]}
          </div>
        ) : (
          <div>
            <Typography variant="h6">{t(toCamelCase(key))}</Typography>
            <Typography>{renderItems(data[key])}</Typography>
          </div>
        )
      )}
    </Box>
  );
}
