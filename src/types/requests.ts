import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";

interface ResponseTranslation {
  message: string;
}

interface QueryOptions extends Partial<UseQueryOptions>, ResponseOptions {
  queryKeySuffix?: string;
}

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

interface ResponseOptions {
  "401"?: ResponseTranslation;
  "403"?: ResponseTranslation;
  "404"?: ResponseTranslation;
  "500"?: ResponseTranslation;
  error?: ResponseTranslation;
  suppressThrow?: boolean;
}

type ResponseJson<T> = Response & {
  data: T;
  message: string;
  status: number;
};

interface Paged<T> {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string;
  from: number;
  to: number;
  data: T;
}

type QueryPayload<T> = T | (() => BodyInit & T);

export type {
  Paged,
  ResponseJson,
  ResponseTranslation,
  ResponseOptions,
  QueryPayload,
  QueryOptions,
  QueryFunctionContextDefault,
};
