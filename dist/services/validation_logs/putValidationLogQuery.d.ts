import { ValidationLogAction } from "./types";
export default function putValidationLogQuery(logId: number): {
    mutationKey: string[];
    mutationFn: (action: ValidationLogAction) => Promise<ResponseJson<ValidationLog>>;
};
