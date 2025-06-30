import { useStore } from "@/data/store";

export default function usePaginatedQueryParams() {
  const paginatedQueryParams = useStore(state => {
    const config = state.getApplication().system;

    return {
      perPage: config.PER_PAGE.value,
    };
  });

  console.log("********** paginatedQueryParams", paginatedQueryParams);

  return paginatedQueryParams;
}
