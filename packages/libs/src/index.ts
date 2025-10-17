export type FormatWalletAddressOptions = {
  leading?: number;
  trailing?: number;
  separator?: string;
};

const DEFAULT_LEADING = 6;
const DEFAULT_TRAILING = 4;

/**
 * Safe formatter for long wallet addresses like `0x1234...abcd`.
 * Keeps the string intact when it is already short or empty.
 */
export function formatWalletAddress(
  address: string,
  {
    leading = DEFAULT_LEADING,
    trailing = DEFAULT_TRAILING,
    separator = "…"
  }: FormatWalletAddressOptions = {}
): string {
  if (typeof address !== "string" || address.trim().length === 0) {
    return "";
  }

  const normalized = address.trim();

  if (normalized.length <= leading + trailing) {
    return normalized;
  }

  const start = normalized.slice(0, leading);
  const end = normalized.slice(-trailing);
  return `${start}${separator}${end}`;
}

export function assertWalletAddress(address: unknown, message?: string): asserts address is string {
  if (typeof address !== "string" || address.trim().length === 0) {
    throw new Error(message ?? "Wallet address must be a non-empty string.");
  }
}

export default {
  formatWalletAddress,
  assertWalletAddress
};
