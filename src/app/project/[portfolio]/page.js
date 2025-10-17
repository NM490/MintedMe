"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import { Button } from "@/components/ui/button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { addressToSlug } from "@/lib/slug-actions";
import { RotateCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true); // initial load
const [refreshing, setRefreshing] = useState(false); // refresh button

const fetchNFTs = useCallback(async () => {
  try {
    if (!projects.length) {
      setLoading(true); // initial load
    } else {
      setRefreshing(true); // refresh
    }

    const res = await fetch(`/api/alchemy/get-project-nft?owner=${address}`);
    const data = await res.json();

    // During refresh, temporarily keep old projects but set them undefined
    if (projects.length) {
      setProjects(projects.map(p => null)); // show skeletons
      await new Promise(r => setTimeout(r, 300)); // optional small delay for UX
    }

    setProjects(data.ownedNfts || []);
  } catch (err) {
    console.error("Failed to fetch NFTs:", err);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, [address, projects]);

  useEffect(() => {
    if (!address || !isConnected) return;
    fetchNFTs();
  }, [address, isConnected]);

  const refreshNFTs = async () => {
    await fetchNFTs();
  };

  const url = address
    ? `http://localhost:3000/browse/${addressToSlug(address)}`
    : "";
  const [layout, setLayout] = useState("grid3");
  const getGridClass = () => {
    switch (layout) {
      case "grid3":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
      case "grid2":
        return "grid grid-cols-1 sm:grid-cols-2 gap-6";
      case "rows":
        return "flex flex-col gap-6";
      default:
        return "grid grid-cols-3 gap-6";
    }
  };
  return (
    <div className="w-full grow flex flex-col justify-center">
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Your NFT Portfolio
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and showcase your blockchain-verified projects
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={refreshNFTs}
                variant="outline"
                disabled={refreshing}
              >
                <RotateCw className={refreshing ? "animate-spin" : ""} />
              </Button>
              <SharePortfolioButton url={url} variant="outline" />
              <MintProjectDialog refreshNFTs={refreshNFTs} />
            </div>
          </div>

          {/* Layout Toggle */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div layout>
              <Button
                variant={layout === "grid3" ? "default" : "outline"}
                onClick={() => setLayout("grid3")}
              >
                3 Grid
              </Button>
            </motion.div>
            <motion.div layout>
              <Button
                variant={layout === "grid2" ? "default" : "outline"}
                onClick={() => setLayout("grid2")}
              >
                2 Grid
              </Button>
            </motion.div>
            <motion.div layout>
              <Button
                variant={layout === "rows" ? "default" : "outline"}
                onClick={() => setLayout("rows")}
              >
                Rows
              </Button>
            </motion.div>
          </motion.div>

          {/* Portfolio Preview Card */}
          <ShareCard url={url} />

          {loading && !projects.length ? (
            <ProjectCard /> // show placeholder only on initial load
          ) : (
          <motion.div layout className={getGridClass()}>
            {(loading && !projects.length) || refreshing
              ? projects.map((_, idx) => (
                  <motion.div layout key={idx} transition={{ duration: 0.35 }} className="h-full">
                    <ProjectCard />
                  </motion.div>
                )) // skeletons
              : projects.map((nft) => (
                  <motion.div
                    layout
                    key={`${nft.contract.address}-${nft.tokenId}`}
                    transition={{ duration: 0.35 }}
                    className="h-full"
                  >
                    <ProjectCard
                      nft={nft}
                      address={address}
                      size={layout}
                      img={nft.image.cachedUrl}
                    />
                  </motion.div>
                ))}
          </motion.div>
          )}

          {projects.length === 0 && !loading && (
            <MintFirstProject refreshNFTs={refreshNFTs} />
          )}
        </div>
      </main>
    </div>
  );
}
