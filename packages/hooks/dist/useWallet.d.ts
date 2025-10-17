export type WalletStatus = "idle" | "connected" | "error";
export type WalletState = {
    address?: string;
    formattedAddress?: string;
    balance: number;
    status: WalletStatus;
    error?: string;
};
export type WalletActions = {
    connect: (address: string) => void;
    disconnect: () => void;
    setBalance: (balance: number) => void;
    fail: (message: string) => void;
    formatAddress: (address?: string) => string;
};
export type UseWalletReturn = {
    state: WalletState;
    actions: WalletActions;
};
/**
 * useWallet centralises wallet state updates on top of Immer.
 * It is intentionally lightweight so the consumer can wire it to any wallet SDK.
 */
export declare function useWallet(initialAddress?: string): UseWalletReturn;
