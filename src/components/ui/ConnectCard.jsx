"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ConnectCard() {

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full flex flex-col h-full items-center"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full m-auto max-w-md">
          <CardHeader className="text-center">
            <div className="rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image src="/minted.svg" alt="Logo" width={50} height={50} className="invert scale-200"/>
            </div>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access this feature and start
              earning ETH rewards.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </>
  );
}
