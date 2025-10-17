import React from "react";
import { createRoot } from "react-dom/client";
import { WalletPanel } from "./components/WalletPanel";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element with id 'root' was not found.");
}

createRoot(container).render(
  <React.StrictMode>
    <WalletPanel />
  </React.StrictMode>
);
