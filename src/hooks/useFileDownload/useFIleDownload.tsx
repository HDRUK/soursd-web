import downloadFileQuery from "@/services/files/downloadFileQuery";

import { useQuery } from "@tanstack/react-query";

export default function useFileDownload(fileId: number) {
  const { data, refetch: downloadFile } = useQuery({
    ...downloadFileQuery(fileId),
    queryKey: [`downloadFile${fileId}`],
    enabled: false,
  });

  return {
    downloadFile,
    data,
  };
}
