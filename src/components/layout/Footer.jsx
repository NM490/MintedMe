export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card dark:bg-clr-surface-a0 py-6 mt-12 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>MintedMe {new Date().getFullYear()}, Where Creativity meets Authenticity.</span>
        <div className="flex flex-col text-xs text-white/30">
          <span>This website showcases an NFT collection.</span>
          <span>As of Development: All artwork, branding, and intellectual property belong to their respective creators and holders.</span>

        </div>
        <span>
          Built with <a href="https://nextjs.org/" className="underline hover:text-primary transition">Next.js</a> &amp; <a href="https://wagmi.sh/" className="underline hover:text-primary transition">Wagmi</a>
        </span>
      </div>
    </footer>
  );
}
