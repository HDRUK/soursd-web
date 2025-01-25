import { ResponseMessageType } from "@/consts/requests";
import {
  QueryOptions,
  QueryPayload,
  ResponseJson,
  ResponseOptions,
} from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";
import cookies from "js-cookie";

function getHeadersWithAuthorisation(headers?: HeadersInit) {
  const accessToken = cookies.get("access_token") || "";

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

  console.log("***** responseError", responseError);

  if (!options?.suppressThrow && responseError)
    return Promise.reject(responseError);

  const data = await response.json();
  console.log("***** data", data);

  const dataError = handleDataError(data, options);

  if (!options?.suppressThrow && dataError) return Promise.reject(dataError);

  return Promise.resolve({
    ...data,
    status: response.status,
  });
}

async function getRequest<T>(url: string, payload?: T, options?: RequestInit) {
  const response = await fetch(
    `${url}${payload ? `?${objectToQuerystring(payload)}` : ""}`,
    {
      ...options,
      headers: getHeadersWithAuthorisation({
        "content-type": "application/json;charset=UTF-8",
        ...options?.headers,
      }),
      ...(options?.body && { body: JSON.stringify(options?.body) }),
    }
  );

  return response;
}

async function postRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: getHeadersWithAuthorisation({
      "content-type": "application/json;charset=UTF-8",
      ...options?.headers,
    }),
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function patchRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: Omit<RequestInit, "body">
) {
  const response = await fetch(url, {
    ...options,
    method: "PATCH",
    headers: getHeadersWithAuthorisation({
      "content-type": "application/json;charset=UTF-8",
      ...options?.headers,
    }),
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function putRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await fetch(url, {
    ...options,
    method: "PUT",
    headers: getHeadersWithAuthorisation({
      "content-type": "application/json;charset=UTF-8",
      ...options?.headers,
    }),
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function deleteRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await fetch(url, {
    ...options,
    method: "DELETE",
    headers: getHeadersWithAuthorisation({
      "content-type": "application/json;charset=UTF-8",
      ...options?.headers,
    }),
  });

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
