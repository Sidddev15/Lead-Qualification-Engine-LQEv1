declare module "papaparse" {
  export interface UnparseConfig {
    delimiter?: string;
    newline?: string;
    quoteChar?: string;
    escapeChar?: string;
    header?: boolean;
    columns?: string[];
  }

  export function unparse<T = unknown>(
    data: T[] | Record<string, unknown> | unknown,
    config?: UnparseConfig
  ): string;

  const Papa: {
    unparse: typeof unparse;
  };

  export default Papa;
}
