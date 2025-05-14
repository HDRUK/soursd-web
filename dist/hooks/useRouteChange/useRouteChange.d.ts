interface UseRouteChangeProps {
    canLeave?: boolean;
    onBlocked: (pathname: string | null) => void;
}
export default function useRouteChange({ canLeave, onBlocked, }: UseRouteChangeProps): {
    continueTo: (pathname: string) => void;
};
export {};
