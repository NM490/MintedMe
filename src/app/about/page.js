'use client'
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => (
  <div className="w-full grow flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <main className="container mx-auto px-6 py-16 max-w-6xl">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left - Content */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
            About MintedMe
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering creators and professionals with blockchain-verified credentials
            and NFT portfolios that showcase true ownership and authenticity.
          </p>
        </motion.div>

        {/* Right - Logo */}
        <motion.div className="flex justify-center lg:justify-end" variants={itemVariants}>
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <Image
              src="/minted.svg"
              alt="MintedMe Logo"
              fill
              className="object-contain invert"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
        {/* Mission Card */}
        <motion.div
          className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            This is a verification platform where students and professionals can
            have their projects, portfolios, or creations verified and transformed
            into NFTs, directly linked to their personal wallets. By leveraging
            blockchain technology, MintedMe helps users prove ownership, prevent fake
            or malicious tampering, and improve their chances of finding jobs with
            trusted credentials.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initial: "M", name: "Mark Angelo Santiago", role: "Developer", desc: "Frontend, Designer" },
              { initial: "W", name: "Walter Avenido", role: "Developer", desc: "Backend, Scripter" },
              { initial: "P", name: "Prince Adriel Arthur Tew", role: "Developer", desc: "Hybrid Front/Back, Tester" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                  {member.initial}
                </div>
                <h3 className="text-md font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground mt-2">{member.role}</p>
                <p className="text-muted-foreground/50 mt-2 text-xs">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl shadow-black/10"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Why Choose MintedMe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "🔒 Secure Verification", desc: "Blockchain-powered verification ensures your credentials are tamper-proof and authentic." },
              { title: "💼 Career Boost", desc: "Stand out to employers with verified, on-chain project credentials." },
              { title: "🎨 NFT Portfolio", desc: "Transform your projects into unique NFTs that showcase your skills." },
              { title: "🌐 Web3 Native", desc: "Built on Base blockchain for fast, low-cost transactions and true ownership." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  </div>
);

export default AboutPage;
