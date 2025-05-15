declare const usePatchReadRequest: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    requestId: number;
    status: number;
}, unknown>;
export default usePatchReadRequest;
