import { useQuery } from "@tanstack/react-query";
import downloadFileQuery from "../../services/files/downloadFileQuery";

export default function useFileDownload(fileId: number) {
  const { refetch: downloadFile, ...queryState } = useQuery({
    ...downloadFileQuery(fileId),
    queryKey: [`downloadFile${fileId}`],
    enabled: false,
  });

  return {
    downloadFile,
    ...queryState,
  };
}
