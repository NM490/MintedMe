"use client";

import Link from "next/link";
import { useState } from "react";
import bs58 from "bs58";
import { motion } from "framer-motion";

export default function BrowseForm() {
  const [address, setAddress] = useState("");

  // Convert Ethereum address to Base58 (slug)
  const encodeAddress = (ethAddress) => {
    try {
      const clean = ethAddress.replace(/^0x/, ""); // remove "0x"
      const bytes = Buffer.from(clean, "hex");
      return bs58.encode(bytes);
    } catch (err) {
      console.error("Invalid address:", err);
      return "";
    }
  };

  const slug = encodeAddress(address);

  return (
    <div className="flex items-center justify-center grow">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 flex flex-col items-center gap-6 m-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl font-bold text-foreground text-center"
        >
          Explore Any Wallet Portfolio
        </motion.h2>

        <motion.input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address (0x...)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />

        {slug && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-full"
          >
            <Link
              href={`/browse/${slug}`}
              className="w-full text-center bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-3 rounded-lg shadow transition-transform transform hover:scale-105 block"
            >
              View Portfolio
            </Link>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-sm text-center"
        >
          Paste a wallet address to see verified NFT projects and portfolios on-chain.
        </motion.p>
      </motion.div>
    </div>
  );
}
