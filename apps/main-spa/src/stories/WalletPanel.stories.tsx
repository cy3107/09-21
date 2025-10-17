import type { Meta, StoryObj } from "@storybook/react";
import { WalletPanel } from "../components/WalletPanel";

const meta: Meta<typeof WalletPanel> = {
  title: "Wallet/WalletPanel",
  component: WalletPanel,
  args: {
    initialAddress: ""
  }
};

export default meta;

type Story = StoryObj<typeof WalletPanel>;

export const Empty: Story = {};

export const WithInitialAddress: Story = {
  args: {
    initialAddress: "0x7833c71c9a3fc2dd0d9ef523eed7fb82fd7fd940"
  }
};
