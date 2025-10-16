import Image from "next/image";
import { Award, FileText, Github } from "lucide-react";
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
  // Skills
  const skillsArray = nft?.raw.metadata.attributes[2].value
    ? nft.raw.metadata.attributes[2].value.split(",").map((s) => s.trim())
    : [];

  // Skeleton placeholders for skills if nft is null
  const skills = nft ? skillsArray : [1, 2, 3];

  return (
    <Card {...props} className="overflow-hidden">
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
        <CardDescription className="text-base leading-relaxed">
          {nft ? nft.description : <SkeletonLoad width="full" height="4" />}
        </CardDescription>
      </CardHeader>

      {/* Skills */}
      <CardContent className="space-y-4">
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
