interface ResponseTranslation {
  message: string;
}

interface ResponseTranslations {
  "401"?: ResponseTranslation;
  "403"?: ResponseTranslation;
  "404"?: ResponseTranslation;
  "500"?: ResponseTranslation;
  error?: ResponseTranslation;
}

type ResponseJson<T> = Response & {
  data: T;
  message: string;
};

interface Paged<T> {
  data: {
    current_page: number;
  } & T;
}

type QueryOptions = Omit<RequestInit, "body">;
type QueryPayload<T> = T | (() => BodyInit & T);

export type {
  Paged,
  ResponseJson,
  ResponseTranslation,
  ResponseTranslations,
  QueryOptions,
  QueryPayload,
};
