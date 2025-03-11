import downloadFileQuery from "@/services/files/downloadFileQuery";
import { useQuery } from "@tanstack/react-query";

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
