import { ResponseEmptyError } from "@/types/query";
import { ResponseOptions } from "@/types/requests";
declare function getHeadersWithAuthorization(headers?: HeadersInit): Promise<any>;
declare function handleResponseError(response: Response | ResponseEmptyError, options?: ResponseOptions): string | null;
declare function handleJsonResponse(response: Response | ResponseEmptyError, options?: ResponseOptions): Promise<any>;
declare function createEmptyErrorResponse(status?: number): Promise<ResponseEmptyError>;
export { createEmptyErrorResponse, getHeadersWithAuthorization, handleJsonResponse, handleResponseError, };
