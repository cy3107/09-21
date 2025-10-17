declare module "@wallet/libs" {
  export type FormatWalletAddressOptions = {
    leading?: number;
    trailing?: number;
    separator?: string;
  };

  export function formatWalletAddress(
    address: string,
    options?: FormatWalletAddressOptions
  ): string;

  export function assertWalletAddress(address: unknown, message?: string): asserts address is string;
}
