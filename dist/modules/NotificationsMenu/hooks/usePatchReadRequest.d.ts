declare const usePatchReadRequest: () => import("@tanstack/react-query").UseMutationResult<unknown, Error, {
    requestId: number;
    status: number;
}, unknown>;
export default usePatchReadRequest;
