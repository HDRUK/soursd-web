import { ResponseMessageType } from "@/consts/requests";
import {
  QueryOptions,
  QueryPayload,
  ResponseJson,
  ResponseOptions,
} from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";

export async function getAccessToken(): Promise<string | undefined> {
  const response = await fetch("/api/auth/token", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Failed to retrieve access token");
    return undefined;
  }

  const data = await response.json();
  return data.access_token;
}

async function getHeadersWithAuthorization(headers?: HeadersInit) {
  const accessToken = await getAccessToken();

  return {
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
    ...headers,
  };
}

function handleResponseError(response: Response, options?: ResponseOptions) {
  if (!response?.ok) {
    if (!options) {
      return new Error(`${response?.status}Error`).message;
    }

    return new Error(
      response?.status === 401
        ? options["401"]?.message
        : options.error?.message
    ).message;
  }

  return null;
}

function handleDataError<T>(data: ResponseJson<T>, options?: ResponseOptions) {
  if (data.message && data.message !== ResponseMessageType.SUCCESS) {
    return new Error(options?.error?.message || "responseError");
  }

  return null;
}

async function handleJsonResponse(
  response: Response,
  options?: ResponseOptions
) {
  const responseError = handleResponseError(response, options);

  if (!options?.suppressThrow && responseError)
    return Promise.reject(responseError);

  const data = await response.json();
  const dataError = handleDataError(data, options);

  if (!options?.suppressThrow && dataError) return Promise.reject(dataError);

  return Promise.resolve({
    ...data,
    status: response.status,
  });
}

async function request<T>(
  method: string,
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const headers = await getHeadersWithAuthorization({
    "content-type":
      payload instanceof FormData
        ? undefined
        : "application/json;charset=UTF-8",
    ...options?.headers,
  });

  const body =
    payload instanceof Function
      ? payload()
      : payload instanceof FormData
        ? payload
        : JSON.stringify(payload);

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body,
  });

  return response;
}

async function getRequest<T>(url: string, payload?: T, options?: RequestInit) {
  const response = await request(
    "GET",
    `${url}${payload ? `?${objectToQuerystring(payload)}` : ""}`,
    payload,
    options
  );
  return response;
}

async function postRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await request("POST", url, payload, options);
  return response;
}

async function patchRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: Omit<RequestInit, "body">
) {
  const response = await request("PATCH", url, payload, options);
  return response;
}

async function putRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await request("PUT", url, payload, options);
  return response;
}

async function deleteRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await request("DELETE", url, payload, options);
  return response;
}

export {
  deleteRequest,
  getRequest,
  handleResponseError,
  patchRequest,
  postRequest,
  putRequest,
  handleJsonResponse,
};
