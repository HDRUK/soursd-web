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
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PostProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, import("@/services/project_details").PostProjectDetailsPayload, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        variables: import("@/services/project_details").PostProjectDetailsPayload;
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PostProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, import("@/services/project_details").PostProjectDetailsPayload, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        error: Error;
        variables: import("@/services/project_details").PostProjectDetailsPayload;
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PostProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, import("@/services/project_details").PostProjectDetailsPayload, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: Response & {
            data: import("@/services/project_details").PostProjectDetailsResponse;
            message: string;
            status: number;
        };
        error: null;
        variables: import("@/services/project_details").PostProjectDetailsPayload;
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PostProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, import("@/services/project_details").PostProjectDetailsPayload, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PutProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        }, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        variables: {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        };
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PutProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        }, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: undefined;
        error: Error;
        variables: {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        };
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PutProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        }, unknown>;
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: Error | null;
        isPaused: boolean;
        submittedAt: number;
    } | {
        data: Response & {
            data: import("@/services/project_details").PutProjectDetailsResponse;
            message: string;
            status: number;
        };
        error: null;
        variables: {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        };
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        mutate: import("@tanstack/react-query").UseMutateFunction<Response & {
            data: import("@/services/project_details").PutProjectDetailsResponse;
            message: string;
            status: number;
        }, Error, {
            params: {
                id: number;
            };
            payload: Partial<ProjectDetails>;
        }, unknown>;
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
