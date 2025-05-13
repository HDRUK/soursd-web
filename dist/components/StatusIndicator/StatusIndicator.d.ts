import React from "react";
type StatusIndicatorProps = {
    variant?: "success" | "error";
    size?: "small" | "medium" | "large";
    label?: string;
};
declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export default StatusIndicator;
