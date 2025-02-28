import { ResponseMessageType } from "@/consts/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export async function getAccessToken(): Promise<string | undefined> {
  const response = await fetch("http://localhost:3000/api/auth/token", {
    method: "GET",
    credentials: "include",
  });

  console.log("response", response);

  // if (!response.ok) {
  //   handleResponseError(response);
  //   return undefined;
  // }

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
  if (
    data.message &&
    data.message !== ResponseMessageType.SUCCESS &&
    !options?.suppressThrow
  ) {
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

export { handleResponseError, handleJsonResponse, getHeadersWithAuthorization };
