export type JsonApiLink<U extends string, V extends object = {}> = keyof V extends never
  ? U
  : { href: U; meta: V };

export interface JsonApiLinks {
  self?: JsonApiLink<string, Record<any, any>>;
  related?: JsonApiLink<string, Record<any, any>>;
}
