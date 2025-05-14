import { DataUse } from "@/types/gateway";
import { ResponseJson } from "@/types/requests";
export default function useGatewayProjectImport(): {
    handleImportData: (payload: {
        custodian_id: number;
        project_id: number;
    }) => Promise<void>;
    data?: ResponseJson<DataUse>;
    isError: boolean;
    isSuccess: boolean;
    isPending: boolean;
};
