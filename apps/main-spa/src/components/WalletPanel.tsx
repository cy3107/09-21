import React, { useState } from "react";
import { useWallet } from "@wallet/hooks";

export type WalletPanelProps = {
  initialAddress?: string;
};

/**
 * WalletPanel 演示了 useWallet hook 的典型使用方式。
 * 可在应用页面或 Storybook 中复用。
 */
export const WalletPanel: React.FC<WalletPanelProps> = ({ initialAddress }) => {
  const { state, actions } = useWallet(initialAddress);
  const [input, setInput] = useState(initialAddress ?? "");

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Wallet Control</h1>
      <section style={{ marginBottom: "1rem" }}>
        <label htmlFor="address">Wallet address</label>
        <input
          id="address"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="0x..."
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
        <button
          type="button"
          onClick={() => actions.connect(input)}
          style={{ marginTop: "0.75rem" }}
        >
          Connect
        </button>
        <button
          type="button"
          onClick={() => actions.disconnect()}
          style={{ marginLeft: "0.5rem", marginTop: "0.75rem" }}
        >
          Disconnect
        </button>
      </section>

      <section>
        <p>Status: {state.status}</p>
        <p>Address: {state.address ?? "-"}</p>
        <p>Formatted: {state.formattedAddress ?? "-"}</p>
        <p>Balance: {state.balance}</p>
        {state.error && <p style={{ color: "red" }}>Error: {state.error}</p>}
      </section>
    </main>
  );
};
