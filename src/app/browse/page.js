"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import bs58 from "bs58";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xEf6bd98C0306BA33C5Caf85B46E55700A02Ad977";

export default function BrowseForm() {
  const [address, setAddress] = useState("");
  const [activeTab, setActiveTab] = useState("browse"); // 'browse' | 'public'

  // --- Browse wallet encode ---
  const encodeAddress = (ethAddress) => {
    try {
      const clean = ethAddress.replace(/^0x/, "");
      const bytes = Buffer.from(clean, "hex");
      return bs58.encode(bytes);
    } catch (err) {
      console.error("Invalid address:", err);
      return "";
    }
  };
  const slug = encodeAddress(address);

  // --- Public portfolio NFT state ---
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterField, setFilterField] = useState("all");

  useEffect(() => {
    async function loadNFTs() {
      if (activeTab !== "public") return; // only load when public tab is active
      try {
        setLoading(true);
        const res = await fetch(`/api/alchemy/get-all-project-nft?contract=${CONTRACT_ADDRESS}`);
        if (!res.ok) throw new Error(`Failed to fetch NFTs (${res.status})`);
        const data = await res.json();
        setNfts(data.nfts || []);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        setError("Failed to load NFTs");
      } finally {
        setLoading(false);
      }
    }
    loadNFTs();
  }, [activeTab]);

  // --- filtering logic ---
  const filteredNFTs = useMemo(() => {
    if (!searchQuery.trim()) return nfts;
    const query = searchQuery.toLowerCase();
    return nfts.filter((nft) => {
      const name = nft.name?.toLowerCase() || "";
      const desc = nft.description?.toLowerCase() || "";
      const address = nft.contract?.address?.toLowerCase() || "";
      const tokenId = nft.tokenId?.toLowerCase() || "";
      const attributes = nft.raw?.metadata?.attributes || [];
      const attributeValues = attributes
        .map((a) => `${a.trait_type || ""} ${a.value || ""}`.toLowerCase())
        .join(" ");

      switch (filterField) {
        case "title":
          return name.includes(query);
        case "address":
          return address.includes(query);
        case "skills":
          return attributeValues.includes(query);
        case "tokenid":
          return tokenId.includes(query);
        default:
          return (
            name.includes(query) ||
            desc.includes(query) ||
            address.includes(query) ||
            tokenId.includes(query) ||
            attributeValues.includes(query)
          );
      }
    });
  }, [nfts, searchQuery, filterField]);

  return (
    <div className="relative flex flex-col items-center justify-center grow mt-24 sm:mt-32">
      {/* --- Tabs floating below navbar --- */}
      <div className="absolute -top-8 sm:-top-10 flex flex-wrap justify-center gap-2 bg-background/40 backdrop-blur-md rounded-full p-1 shadow-lg z-10">
        {["browse", "public"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "browse" ? "Browse Wallet" : "Public Portfolios"}
          </button>
        ))}
      </div>

      {/* --- Card container --- */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl w-11/12 sm:w-4/5 lg:w-3/5 flex flex-col items-center gap-6 m-auto relative mt-10"
      >
        {/* --- Browse Wallet Tab --- */}
        {activeTab === "browse" && (
          <>
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
          </>
        )}

        {/* --- Public Portfolios Tab --- */}
        {activeTab === "public" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full gap-6"
          >
            <h2 className="text-2xl font-bold text-foreground text-center">
              Public Portfolios
            </h2>

            {loading ? (
              <p className="text-muted-foreground">Loading NFTs...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {/* 🔍 Search + Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <input
                    type="text"
                    placeholder="Search NFTs (e.g. React, Token #1, MintedMe)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value)}
                    className="border rounded-xl px-3 py-2"
                  >
                    <option value="all">All Fields</option>
                    <option value="title">Title</option>
                    <option value="address">Contract Address</option>
                    <option value="skills">Skills / Attributes</option>
                    <option value="tokenid">Token ID</option>
                  </select>
                </div>

                {filteredNFTs.length === 0 ? (
                  <p className="text-muted-foreground text-center">
                    No NFTs found for this search.
                  </p>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
                    {filteredNFTs.map((nft, i) => (
                      <ProjectCard
                        key={i}
                        nft={nft}
                        title={nft.name}
                        description={nft.description}
                        img={nft.image?.cachedUrl || "/placeholder.png"}
                        address={nft.contract?.address}
                        attributes={nft.raw?.metadata?.attributes}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
