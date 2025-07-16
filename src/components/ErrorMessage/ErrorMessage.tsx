import { WithTranslations } from "@/types/application";
import ContactLink from "../ContactLink";

export type ErrorMessageProps = WithTranslations<{ tKey?: string | Error }>;

export default function ErrorMessage({ tKey = "error", t }: ErrorMessageProps) {
  return !t.rich ? t(tKey) : t.rich(tKey, { contactLink: ContactLink });
}
