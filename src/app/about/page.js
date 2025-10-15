import Image from "next/image";
import React from "react";

const AboutPage = () => (
  <div className="w-full grow flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <main className="container mx-auto px-6 py-16 max-w-6xl">
      {/* Hero Section - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left - Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight font-minted">
            MintedMe
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering creators and professionals with blockchain-verified credentials
            and NFT portfolios that showcase true ownership and authenticity.
          </p>
        </div>

        {/* Right - Logo */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <Image
              src="/minted.svg"
              alt="MintedMe Logo"
              fill
              className="object-contain invert"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Mission Card */}
        <div className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground font-minted">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            This is a verification platform where students and professionals can
            have their projects, portfolios, or creations verified and transformed
            into NFTs, directly linked to their personal wallets. By leveraging
            blockchain technology, MintedMe helps users prove ownership, prevent fake
            or malicious tampering, and improve their chances of finding jobs with
            trusted credentials.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground font-minted">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-md">
                M
              </div>
              <h3 className="text-md font-semibold text-foreground">Mark Angelo Santiago</h3>
              <p className="text-muted-foreground mt-2">Developer</p>
              <p className="text-muted-foreground/50 mt-2 text-xs">Frontend, Designer</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <h3 className="text-md font-semibold text-foreground">Walter Avenido</h3>
              <p className="text-muted-foreground mt-2">Developer</p>
              <p className="text-muted-foreground/50 mt-2 text-xs">Backend, Scripter</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <h3 className="text-md font-semibold text-foreground">Prince Adriel Arthur Tew</h3>
              <p className="text-muted-foreground mt-2">Developer</p>
              <p className="text-muted-foreground/50 mt-2 text-xs">Hybrid Front/Back, Tester</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground font-minted">Why Choose MintedMe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <h3 className="text-xl font-semibold mb-3 text-foreground">🔒 Secure Verification</h3>
              <p className="text-muted-foreground">Blockchain-powered verification ensures your credentials are tamper-proof and authentic.</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <h3 className="text-xl font-semibold mb-3 text-foreground">💼 Career Boost</h3>
              <p className="text-muted-foreground">Stand out to employers with verified, on-chain project credentials.</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <h3 className="text-xl font-semibold mb-3 text-foreground">🎨 NFT Portfolio</h3>
              <p className="text-muted-foreground">Transform your projects into unique NFTs that showcase your skills.</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
              <h3 className="text-xl font-semibold mb-3 text-foreground">🌐 Web3 Native</h3>
              <p className="text-muted-foreground">Built on Base blockchain for fast, low-cost transactions and true ownership.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AboutPage;