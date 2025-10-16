import Image from "next/image";
import { Award, FileText, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { VerificationDialog } from "../dialogs/verification-dialog";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ nft, address, img, size, ...props }) {
  const descRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);

  useEffect(() => {
    function checkOverflow() {
      const el = descRef.current;
      if (!el) return setHasOverflow(false);
      setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    }

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [nft?.description]);

  // update thumb position/size
  useEffect(() => {
    function updateThumb() {
      const el = descRef.current;
      if (!el) return;
      const ch = el.clientHeight;
      const sh = el.scrollHeight;
      const st = el.scrollTop;
      if (sh <= ch) {
        setThumbHeight(0);
        setThumbTop(0);
        return;
      }
      const ratio = ch / sh;
      const heightPx = Math.max(Math.round(ratio * ch), 16); // minimal thumb
      const maxTop = ch - heightPx;
      const topPx = Math.round((st / (sh - ch)) * maxTop) || 0;
      setThumbHeight(heightPx);
      setThumbTop(topPx);
    }

    updateThumb();
    const el = descRef.current;
    if (el) el.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    return () => {
      if (el) el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, [hasOverflow, nft?.description]);
  // Skills
  const skillsArray = nft?.raw.metadata.attributes[2].value
    ? nft.raw.metadata.attributes[2].value.split(",").map((s) => s.trim())
    : [];

  // Skeleton placeholders for skills if nft is null
  const skills = nft ? skillsArray : [1, 2, 3];

  return (
    <Card {...props} className="overflow-hidden h-full flex flex-col">
      <CardHeader className="space-y-3">
        {/* Project Image */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-primary/10">
          {img ? (
            <Image
              src={img}
              alt={nft?.name || "Project image"}
              fill
              className="object-cover"
            />
          ) : (
            <SkeletonLoad width="full" height="48" />
          )}
        </div>

        {/* Title + Badges */}
        <div className="flex items-center gap-3">
          <CardTitle className="text-xl">
            {nft ? nft.name : <SkeletonLoad width="32" height="6" />}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${!nft && "animate-pulse bg-primary/10 border-primary/20"}`}
          >
            {nft ? nft.tokenId : "\u00A0"}
          </Badge>
          <Badge
            variant="default"
            className={`gap-1 bg-primary text-primary-foreground ${
              !nft && "animate-pulse bg-primary/30"
            }`}
          >
            <Award className="w-3 h-3" />
            {size === "rows" || size === "grid2" ? "Verified" : ""}
          </Badge>
        </div>

        {/* Description */}
        <div className="relative">
          <CardDescription
            ref={descRef}
            className="text-base text-justify leading-relaxed overflow-auto pr-2"
            style={{ maxHeight: "4.5rem" }}
            tabIndex={0}
            aria-label="Project description"
          >
            {nft ? nft.description : <SkeletonLoad width="full" height="4" />}
          </CardDescription>

          {hasOverflow && (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 flex items-start justify-center">
              <div className="relative w-1 h-full flex items-start justify-center">
                <div
                  className="absolute right-0 bg-purple-600 dark:bg-purple-500 rounded w-px"
                  style={{ top: thumbTop, height: thumbHeight }}
                />
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Skills and actions - push to bottom so cards align */}
      <CardContent className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) =>
            nft ? (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ) : (
              <SkeletonLoad key={index} width="20" height="6" />
            )
          )}
        </div>

  {/* Buttons */}
  <div className="flex items-center gap-4 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            disabled={!nft}
            asChild={!!nft}
          >
            <a
              className="flex items-center gap-2"
              href={nft?.raw.metadata.attributes[0].value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              {size === "rows" ? "View Code" : ""}
            </a>
          </Button>

          {nft?.raw.metadata.attributes[1].value && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a
                className="flex items-center gap-2"
                href={nft.raw.metadata.attributes[1].value}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-4 h-4" />
                {size === "rows" ? "Live Demo" : ""}
              </a>
            </Button>
          )}

          <VerificationDialog project={nft} walletAddress={address} />

          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            disabled={!nft}
            asChild={!!nft}
          >
            <a
              className="flex items-center gap-2"
              href={`https://sepolia.basescan.org/token/${nft?.contract.address}?a=${nft?.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {size === "rows" ? "" : "View on Etherscan"}
            </a>
          </Button>
        </div>

        {/* Mint date */}
        <div className="text-sm text-muted-foreground pt-2 border-t border-border">
          Minted on{" "}
          {nft ? new Date(nft?.mintedAt).toLocaleDateString() : <SkeletonLoad width="24" height="4" />}
        </div>
      </CardContent>
    </Card>
  );
}

// Compact skeleton component
function SkeletonLoad({ width = "full", height = "4", customClassName = "" }) {
  return (
    <div
      className={`bg-gradient-to-r from-primary/20 to-primary/30 rounded-md animate-pulse ${customClassName} w-${width} h-${height}`}
    />
  );
}
