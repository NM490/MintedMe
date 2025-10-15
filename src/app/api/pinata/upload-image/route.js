import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
  try {
    // Parse form data from the request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert the file (Blob) to a Buffer for Pinata
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a new FormData instance for Pinata
    const pinataData = new FormData();
    pinataData.append("file", buffer, file.name || "upload.png");

    // (optional) group ID for better organization in your Pinata account
    pinataData.append(
      "pinataOptions",
      JSON.stringify({
        groupId: process.env.PINATA_GROUP_ID,
      })
    );

    // Send the image to Pinata
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      pinataData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...pinataData.getHeaders(),
        },
      }
    );

    // ✅ Return only the IPFS hash
    return NextResponse.json({
      success: true,
      ipfsHash: res.data.IpfsHash,
    });
  } catch (err) {
    console.error("Pinata upload error:", err.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        error: err.response?.data?.error || err.message,
      },
      { status: 500 }
    );
  }
}
