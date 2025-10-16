"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import { Button } from "@/components/ui/button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { addressToSlug, slugToAddress } from "@/lib/slug-actions";
import { RotateCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const params = useParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridSize, setGridSize] = useState("grid3"); // 'grid3' | 'grid2' | 'grid1'
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  console.log(slugToAddress(params.portfolio));

  const fetchNFTs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/alchemy/get-project-nft?owner=${slugToAddress(params.portfolio)}`);
      const data = await res.json();
      setProjects(data.ownedNfts || []);
    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    
    fetchNFTs();
  }, [params]);

  const refreshNFTs = async () => {
    await fetchNFTs();
  };


  return (
    <>
      <div className="w-full grow flex flex-co justify-center ">
        <main className="container mx-auto px-6 py-12">
          <div className="space-y-8">
            

            {/* Explore section - centered above the grid */}
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="max-w-3xl">
                <h3 className="text-4xl font-minted font-semibold">Explore Projects</h3>
                <p className="text-xl text-muted-foreground mt-2">
                  Discover a collection of innovative projects built with creativity, technology, and purpose — explore and get inspired.
                </p>
              </div>

              
            </div>

            {/* Viewing row: show current wallet and search (under Explore) */}
            <div className="mb-4 flex items-center justify-between">
              <div className="w-1/3 flex items-center gap-3">
                <button
                  className={`px-3 py-1 rounded ${gridSize === 'grid3' ? 'bg-primary text-white' : 'bg-transparent border border-border'}`}
                  onClick={() => setGridSize('grid3')}
                  aria-pressed={gridSize === 'grid3'}
                  title="3 columns"
                >
                  3 Grid
                </button>
                <button
                  className={`px-3 py-1 rounded ${gridSize === 'grid2' ? 'bg-primary text-white' : 'bg-transparent border border-border'}`}
                  onClick={() => setGridSize('grid2')}
                  aria-pressed={gridSize === 'grid2'}
                  title="2 columns"
                >
                  2 Grid
                </button>
                <button
                  className={`px-3 py-1 rounded ${gridSize === 'grid1' ? 'bg-primary text-white' : 'bg-transparent border border-border'}`}
                  onClick={() => setGridSize('grid1')}
                  aria-pressed={gridSize === 'grid1'}
                  title="1 column"
                >
                  Rows
                </button>
              </div>
              <div className="w-1/3 text-center">
                <div className="text-base font-minted">Now Viewing</div>
                <div className="font-mono text-sm">{slugToAddress(params.portfolio)}</div>
              </div>
              <div className="w-1/3 flex justify-end">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!searchValue) return;
                    const val = searchValue.trim();
                    const isHexAddress = /^0x[0-9a-fA-F]{40}$/.test(val);
                    const slug = isHexAddress ? addressToSlug(val) : val;
                    router.push(`/browse/${slug}`);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search Other Wallets"
                    className="px-3 py-2 border border-border rounded-md text-sm"
                  />
                  <button className="px-3 py-2 bg-primary text-white rounded-md text-sm">Go</button>
                </form>
              </div>
            </div>

            {loading ? (
              <ProjectCard />
            ) : (
              <motion.div layout className={`grid gap-6 ${gridSize === 'grid3' ? 'md:grid-cols-3' : gridSize === 'grid2' ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                {projects.map((nft) => (
                  <motion.div key={`${nft.contract.address}-${nft.tokenId}`} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                    <ProjectCard
                      nft={nft}
                      address={slugToAddress(params.portfolio)}
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
    </>
  );
}
