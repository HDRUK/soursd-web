export type SearchParams = Record<string, string | number | undefined>;

export interface ResponseEmptyError {
  ok: boolean;
  status: number;
  json: () => Promise<{
    message: string;
    data: null;
  }>;
}
