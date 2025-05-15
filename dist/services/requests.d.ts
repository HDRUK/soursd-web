import { QueryPayload } from "@/types/requests";
declare function isServer(): boolean;
declare function getRequest<T>(url: string, payload?: T, options?: RequestInit): Promise<Response | import("../types/query").ResponseEmptyError>;
declare function postRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<Response | import("../types/query").ResponseEmptyError>;
declare function patchRequest<T>(url: string, payload?: QueryPayload<T>, options?: Omit<RequestInit, "body">): Promise<Response | import("../types/query").ResponseEmptyError>;
declare function putRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<Response | import("../types/query").ResponseEmptyError>;
declare function deleteRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<Response | import("../types/query").ResponseEmptyError>;
export { deleteRequest, getRequest, patchRequest, postRequest, putRequest, isServer, };
