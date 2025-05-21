import { useTranslations } from "next-intl";
import { toTitleCase } from "../../utils/string";

function useFallbackTranslations(namespace: string) {
  const t = useTranslations(namespace);

  return (key: string) => {
    const hasTitle = t.raw(key) !== `${namespace}.${key}`;
    return hasTitle ? t(key) : toTitleCase(key);
  };
}

export default useFallbackTranslations;
