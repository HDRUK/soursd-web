export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export type StringKeyOf<T> = Extract<keyof T, string>;
