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

export type { ResponseTranslations, ResponseTranslation };
