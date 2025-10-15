"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import { Button } from "@/components/ui/button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { addressToSlug , slugToAddress } from "@/lib/slug-actions";
import { RotateCw } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const params = useParams();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
            

            {loading ? (
              <ProjectCard />
            ) : (
              <div className="grid gap-6">
                {projects.map((nft) => (
                  <ProjectCard
                    nft={nft}
                    key={`${nft.contract.address}-${nft.tokenId}`}
                    address={slugToAddress(params.portfolio)}
                    img={nft.image.cachedUrl}
                  />
                ))}
              </div>
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
