"use client";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FaEthereum } from "react-icons/fa";
import { EthBalance } from "@coinbase/onchainkit/identity";
import SheetActions from "../layout/SheetActions";
import { useAccount } from "wagmi";

import dynamic from "next/dynamic";

const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

export default function WalletSheet() {
  const { address, isConnected } = useAccount();

  return (
    <>
    <MoonPayProvider 
      apiKey="pk_test_123" 
      debug
    >
      {isConnected && (
        <Sheet >
          <SheetTrigger asChild className="group border border-purple-500 bg-white text-white hover:text-white transition dark:border-white dark:bg-purple-500 dark:text-white">
            <Button className={`h-full font-bold flex justify-center items-center hover:text-white group-hover:text-white`}>
              <FaEthereum size={24} />
            </Button>
          </SheetTrigger>
          <SheetActions />
        </Sheet>
      )}
      </MoonPayProvider>
    </>
  );
}
