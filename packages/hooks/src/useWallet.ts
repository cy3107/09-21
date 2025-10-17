import { useCallback } from "react";
import { useImmer } from "use-immer";
import { assertWalletAddress, formatWalletAddress } from "@wallet/libs";

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

const createInitialState = (initialAddress?: string): WalletState => {
  if (!initialAddress) {
    return {
      balance: 0,
      status: "idle"
    };
  }

  assertWalletAddress(initialAddress);

  const normalized = initialAddress.trim();
  return {
    address: normalized,
    formattedAddress: formatWalletAddress(normalized),
    balance: 0,
    status: "connected"
  };
};

/**
 * useWallet centralises wallet state updates on top of Immer.
 * It is intentionally lightweight so the consumer can wire it to any wallet SDK.
 */
export function useWallet(initialAddress?: string): UseWalletReturn {
  const [state, update] = useImmer<WalletState>(() => createInitialState(initialAddress));

  const connect = useCallback(
    (address: string) => {
      update((draft) => {
        try {
          assertWalletAddress(address);
          draft.address = address.trim();
          draft.formattedAddress = formatWalletAddress(draft.address);
          draft.status = "connected";
          draft.error = undefined;
        } catch (error) {
          draft.status = "error";
          draft.error = error instanceof Error ? error.message : "Unable to connect.";
        }
      });
    },
    [update]
  );

  const disconnect = useCallback(() => {
    update((draft) => {
      draft.address = undefined;
      draft.formattedAddress = undefined;
      draft.balance = 0;
      draft.status = "idle";
      draft.error = undefined;
    });
  }, [update]);

  const setBalance = useCallback(
    (balance: number) => {
      update((draft) => {
        draft.balance = balance;
      });
    },
    [update]
  );

  const fail = useCallback(
    (message: string) => {
      update((draft) => {
        draft.status = "error";
        draft.error = message;
      });
    },
    [update]
  );

  const formatAddress = useCallback(
    (address?: string) => {
      const input = address ?? state.address;
      if (!input) {
        return "";
      }
      return formatWalletAddress(input);
    },
    [state.address]
  );

  return {
    state,
    actions: {
      connect,
      disconnect,
      setBalance,
      fail,
      formatAddress
    }
  };
}
