import { Features } from "@/types/roles";
export default function useFeature(id: keyof Features): {
    isAllowed: boolean;
    enabled: any;
};
