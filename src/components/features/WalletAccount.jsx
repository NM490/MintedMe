"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function WalletAccount({ ...props }) {
  const { address, isConnected } = useAccount();

  function setWalletCookie(address) {
    document.cookie = `wallet=${address}; path=/; SameSite=Lax`;
  }

  function clearWalletCookie() {
    document.cookie = "wallet=; path=/; Max-Age=0";
  }

  useEffect(() => {
    if (isConnected && address) {
      setWalletCookie(address);
      // ✅ Removed router.refresh()
    } else {
      clearWalletCookie();
      // ✅ Removed router.refresh()
    }
  }, [isConnected, address]);

  return (
    <>
      <div {...props}>
        <Wallet>
          <ConnectWallet
            className={`h-[38px] px-4 py-2 border rounded-md flex items-center justify-center border-primary/60 hover:dark:border-purple-500 dark:hover:bg-primary/20 hover:text-white transition dark:border-1 dark:bg-transparent dark:text-white`}
          >
            <Name className="text-purple-500 dark:text-white" />
          </ConnectWallet>
          <WalletDropdown>
            <WalletAdvancedWalletActions />
            <Identity hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
            </Identity>
            <WalletDropdownLink
              target="_blank"
              href="https://keys.coinbase.com"
              icon="wallet"
              className={"relative text-purple-500"}
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect className="text-purple-500 dark:text-white" />
          </WalletDropdown>
        </Wallet>
      </div>
    </>
  );
}