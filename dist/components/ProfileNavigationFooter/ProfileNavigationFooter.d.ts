export type ProfileNavigationFooterProps = {
    nextStepText?: string;
    isLoading?: boolean;
    previousHref?: string;
    nextHref?: string;
    isDisabled?: boolean;
    isLastStep?: boolean;
    onClick?: () => void;
};
export default function ProfileNavigationFooter({ previousHref, nextHref, nextStepText, isLoading, isDisabled, isLastStep, onClick, }: ProfileNavigationFooterProps): import("react/jsx-runtime").JSX.Element;
