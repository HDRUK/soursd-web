interface PostValidationLogCommentPayload {
    user_id: number;
    validation_log_id: number;
    comment: string;
}
export declare enum ValidationLogAction {
    PASS = "pass",
    FAIL = "fail"
}
export type { PostValidationLogCommentPayload };
