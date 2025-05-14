import { QueryPayload } from "@/types/requests";
declare function isServer(): boolean;
declare function getRequest<T>(url: string, payload?: T, options?: RequestInit): Promise<any>;
declare function postRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<any>;
declare function patchRequest<T>(url: string, payload?: QueryPayload<T>, options?: Omit<RequestInit, "body">): Promise<any>;
declare function putRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<any>;
declare function deleteRequest<T>(url: string, payload?: QueryPayload<T>, options?: RequestInit): Promise<any>;
export { deleteRequest, getRequest, patchRequest, postRequest, putRequest, isServer, };
