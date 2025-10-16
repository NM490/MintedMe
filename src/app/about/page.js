'use client'
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

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
 const members = [
    {
      img: "https://avatars.githubusercontent.com/u/158138262?v=4", // replace with your actual image path or URL
      name: "Mark Angelo Santiago",
      role: "Developer",
      desc: "Frontend, Designer",
      github: "https://github.com/MarksIT23", // 🧠 change to real URL
    },
    {
      img: "https://avatars.githubusercontent.com/u/140160866?v=4",
      name: "Walter Avenido",
      role: "Developer",
      desc: "Backend, Scripter",
      github: "https://github.com/nm490", // 🧠 change to real URL
    },
    {
      img: "https://avatars.githubusercontent.com/u/158138394?v=4",
      name: "Prince Adriel Arthur Tew",
      role: "Developer",
      desc: "Hybrid Front/Back, Tester",
      github: "https://github.com/PrinceTew", // 🧠 change to real URL
    },
  ];
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
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
    Team Members
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {members.map((member, idx) => (
    <motion.div
      key={idx}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex" // ensures equal height across all cards
    >
      <a
        href={member.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col justify-between text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 focus:ring-2 focus:ring-primary focus:outline-none w-full min-h-[340px]" // consistent height
      >
        {/* Top Section — Image + Name */}
        <div>
          <div className="w-20 h-20 mx-auto mb-4 relative rounded-full overflow-hidden border border-white/10">
            <Image
              src={member.img}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-md font-semibold text-foreground">
            {member.name}
          </h3>
        </div>

        {/* Bottom Section — Role + Desc + Icon */}
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="text-muted-foreground">{member.role}</p>
          <p className="text-muted-foreground/50 text-xs">{member.desc}</p>
          <div className="mt-2 flex justify-center text-muted-foreground hover:text-primary transition-colors">
            <FaGithub className="text-lg" />
          </div>
        </div>
      </a>
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
