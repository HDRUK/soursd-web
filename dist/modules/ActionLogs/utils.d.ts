import { ROUTES } from "@/consts/router";
type Route = Record<keyof typeof ROUTES, {
    path: string;
}>;
export interface ActionConfig {
    icon: React.ReactNode;
    path: string;
}
declare const generateActions: (routes: Route) => Record<string, ActionConfig>;
export default generateActions;
