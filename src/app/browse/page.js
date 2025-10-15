"use client";

import Link from "next/link";
import { useState } from "react";
import bs58 from "bs58";

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
    <div className="flex flex-col items-center gap-4 p-10">
      <h2 className="text-2xl font-bold">View Any Wallet Portfolio</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address (0x...)"
        className="border p-2 rounded w-96"
      />
      {slug && (
        <Link
          href={`/browse/${slug}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Portfolio
        </Link>
      )}
    </div>
  );
}
