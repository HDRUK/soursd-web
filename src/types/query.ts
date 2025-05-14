export type SearchParams = Record<
  string,
  string | number | string[] | undefined
>;

export type QueryParams = SearchParams;

export interface ResponseEmptyError {
  ok: boolean;
  status: number;
  json: () => Promise<{
    message: string;
    data: null;
  }>;
}
