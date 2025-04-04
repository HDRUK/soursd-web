import { toCamelCase } from "@/utils/string";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface FieldsToTextProps<T> {
  data: T;
  keys: (
    | Extract<keyof T, string>
    | {
        column_id?: Extract<keyof T, string>;
        heading?: ReactNode;
        content?: ReactNode;
      }
  )[];
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
      if (typeof key !== "string") {
        if (!key.column_id) return true;

        return Array.isArray(data[key.column_id])
          ? data[key.column_id].length
          : data[key.column_id] !== "";
      }

      return Array.isArray(data[key]) ? !!data[key].length : data[key] !== "";
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
        typeof key === "string" ? (
          <div>
            <Typography variant="h6">{t(toCamelCase(key))}</Typography>
            <Typography>{renderItems(data[key])}</Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h6">
              {key.heading || t(toCamelCase(key.column_id as string))}
            </Typography>
            <Typography>
              {key.content || renderItems(data[key.column_id])}
            </Typography>
          </div>
        )
      )}
    </Box>
  );
}
