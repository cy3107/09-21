export type FormatWalletAddressOptions = {
    leading?: number;
    trailing?: number;
    separator?: string;
};
/**
 * Safe formatter for long wallet addresses like `0x1234...abcd`.
 * Keeps the string intact when it is already short or empty.
 */
export declare function formatWalletAddress(address: string, { leading, trailing, separator }?: FormatWalletAddressOptions): string;
export declare function assertWalletAddress(address: unknown, message?: string): asserts address is string;
declare const _default: {
    formatWalletAddress: typeof formatWalletAddress;
    assertWalletAddress: typeof assertWalletAddress;
};
export default _default;
