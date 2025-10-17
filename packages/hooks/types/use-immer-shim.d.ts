declare module "use-immer" {
  export function useImmer<T>(
    initialValue: T | (() => T)
  ): [T, (updater: (draft: T) => void) => void];
}
