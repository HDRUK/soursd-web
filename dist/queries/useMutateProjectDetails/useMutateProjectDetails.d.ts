import { ProjectDetails } from "@/types/application";
interface UseCustodianInviteProps {
    onSuccess?: () => void;
    onError?: () => void;
}
export default function useMutateProjectDetails(projectId: number, callbacks?: UseCustodianInviteProps): {
    mutateState: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, void, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        variables: void;
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, void, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        error: Error;
        variables: void;
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, void, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: unknown;
        error: null;
        variables: void;
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        mutate: import("@tanstack/react-query").UseMutateFunction<unknown, Error, void, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    };
    mutateAsync: (projectDetails: ProjectDetails) => Promise<void>;
};
export {};
