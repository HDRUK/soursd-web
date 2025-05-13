import { StoreUserHistories } from "@/data/store";
import { User } from "@/types/application";
import { EntityType } from "@/types/api";
interface TrainingProps {
    variant: EntityType;
    user: User;
    setHistories?: (histories: StoreUserHistories) => void;
    getHistories?: () => StoreUserHistories | undefined;
}
export default function Training({ variant, user, setHistories, getHistories, }: TrainingProps): import("react/jsx-runtime").JSX.Element;
export {};
