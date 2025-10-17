import { NextResponse } from "next/server";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = "0x541385DB543875ee6B0270eA3294a8c55c9E48A6";
const NETWORK = "base-sepolia";

async function fetchAllNFTsForContract(contractAddress) {
  if (!ALCHEMY_API_KEY) {
    throw new Error("Missing ALCHEMY_API_KEY in environment variables");
  }

  const baseUrl = `https://${NETWORK}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForContract`;
  let allNFTs = [];
  let pageKey = null;

  do {
    const url = new URL(baseUrl);
    url.searchParams.set("contractAddress", contractAddress);
    url.searchParams.set("withMetadata", "true");
    if (pageKey) url.searchParams.set("pageKey", pageKey);

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`Alchemy NFT fetch failed: ${res.status}`);

    const data = await res.json();
    allNFTs.push(...(data?.nfts || []));
    pageKey = data.pageKey || null;
  } while (pageKey);

  return allNFTs;
}

/**
 * 🔍 Optionally fetch transaction info for a token (mint, gasUsed, etc.)
 */
async function fetchMintData(tokenId) {
  const txUrl = `https://${NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
  const body = {
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        contractAddresses: [CONTRACT_ADDRESS],
        category: ["erc721"],
        withMetadata: true,
        maxCount: "0x1",
        order: "desc",
        nftTokenId: tokenId,
      },
    ],
  };

  const res = await fetch(txUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;
  const json = await res.json();
  const tx = json?.result?.transfers?.[0];
  if (!tx) return null;

  return {
    mintedAt: tx.metadata?.blockTimestamp || null,
    transactionHash: tx.hash || null,
    blockNumber: tx.blockNum ? parseInt(tx.blockNum, 16) : null,
    gasUsed: tx.gasUsed ? parseInt(tx.gasUsed, 16) : null,
  };
}

/**
 * 🧾 Main API handler
 */
export async function GET() {
  try {
    const nfts = await fetchAllNFTsForContract(CONTRACT_ADDRESS);

    const enriched = await Promise.all(
      nfts.map(async (nft) => {
        const mintExtras = await fetchMintData(nft.tokenId);

        return {
          ...nft,
          contract: {
            ...nft.contract,
            isSpam: nft.contract?.isSpam ?? false,
            spamClassifications: nft.contract?.spamClassifications || [],
          },
          // Add missing standardized fields
          balance: "1",
          mintedAt: mintExtras?.mintedAt || nft.mint?.timestamp || null,
          transactionHash:
            mintExtras?.transactionHash || nft.mint?.transactionHash || null,
          blockNumber: mintExtras?.blockNumber || nft.mint?.blockNumber || null,
          gasUsed: mintExtras?.gasUsed || null,
        };
      })
    );

    return NextResponse.json({
      contractAddress: CONTRACT_ADDRESS,
      total: enriched.length,
      nfts: enriched,
    });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch enriched NFT data" },
      { status: 500 }
    );
  }
}
