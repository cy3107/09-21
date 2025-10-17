declare module "react" {
  export type DependencyList = ReadonlyArray<unknown>;
  export type Callback<T extends (...args: never[]) => unknown> = T;

  export function useCallback<T extends (...args: never[]) => unknown>(
    callback: T,
    deps: DependencyList
  ): T;
}
