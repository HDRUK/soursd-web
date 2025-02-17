export default function SearchFilters() {
  return (
    <SearchBar
      onSearch={text => updateQueryParam("title[]", text)}
      placeholder={t("searchPlaceholder")}
    />
  );
}
