import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ipfsHash = searchParams.get("ipfsHash");

    if (!ipfsHash) {
      return NextResponse.json(
        { success: false, error: "No IPFS hash provided" },
        { status: 400 }
      );
    }

    // Call Pinata unpin endpoint
    await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `File with hash ${ipfsHash} deleted successfully`,
    });
  } catch (err) {
    console.error("Pinata delete error:", err.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        error: err.response?.data?.error || err.message,
      },
      { status: 500 }
    );
  }
}
