import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");

  if (!owner) {
    return NextResponse.json({ error: "Owner address required" }, { status: 400 });
  }

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  const CONTRACT_ADDRESS = "0x541385DB543875ee6B0270eA3294a8c55c9E48A6";
  const NETWORK = "base-sepolia";
  const rpcUrl = `https://${NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

  try {
    // 1️⃣ Fetch owned NFTs
    const nftsUrl = `https://${NETWORK}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${owner}&contractAddresses[]=${CONTRACT_ADDRESS}`;
    const response = await fetch(nftsUrl);
    if (!response.ok) {
      const text = await response.text();
      console.error("Alchemy NFT fetch error:", text);
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    const ownedNfts = data.ownedNfts || [];
    if (ownedNfts.length === 0) {
      return NextResponse.json({ ownedNfts: [] });
    }

    // 2️⃣ Fetch mint transfers (mint history)
    const transfersRes = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            category: ["erc721"],
            contractAddresses: [CONTRACT_ADDRESS],
            fromAddress: "0x0000000000000000000000000000000000000000",
            withMetadata: true,
          },
        ],
      }),
    });

    const transfersData = await transfersRes.json();
    const mintTransfers = transfersData?.result?.transfers || [];

    // 3️⃣ Fetch all receipts in parallel (no sequential blocking)
    const receiptPromises = mintTransfers.map(async (t) => {
      const tokenId = BigInt(t.tokenId).toString();
      const transactionHash = t.hash;
      const blockNumber = t.blockNum ? parseInt(t.blockNum, 16) : null;
      const mintedAt = t.metadata?.blockTimestamp
        ? new Date(t.metadata.blockTimestamp)
        : null;

      let gasUsed = null;
      if (transactionHash) {
        try {
          const receiptRes = await fetch(rpcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "eth_getTransactionReceipt",
              params: [transactionHash],
            }),
          });
          const receiptData = await receiptRes.json();
          gasUsed = receiptData?.result?.gasUsed
            ? parseInt(receiptData.result.gasUsed, 16)
            : null;
        } catch (err) {
          console.error("Receipt fetch failed:", transactionHash, err);
        }
      }

      return { tokenId, mintedAt, transactionHash, blockNumber, gasUsed };
    });

    // Wait for all receipt requests (concurrent)
    const receiptResults = await Promise.allSettled(receiptPromises);
    const mintMap = {};
    for (const r of receiptResults) {
      if (r.status === "fulfilled") {
        const { tokenId, ...meta } = r.value;
        mintMap[tokenId] = meta;
      }
    }

    // 4️⃣ Enrich and sort owned NFTs
    const enrichedNFTs = ownedNfts
      .map((nft) => {
        const tokenId = BigInt(nft.tokenId).toString();
        return { ...nft, ...mintMap[tokenId] };
      })
      .sort((a, b) => {
        const dateA = a.mintedAt ? new Date(a.mintedAt).getTime() : 0;
        const dateB = b.mintedAt ? new Date(b.mintedAt).getTime() : 0;
        return dateB - dateA;
      });

    return NextResponse.json({ ownedNfts: enrichedNFTs });
  } catch (err) {
    console.error("Server error fetching NFTs:", err);
    return NextResponse.json({ error: "Failed to fetch NFTs" }, { status: 500 });
  }
}
