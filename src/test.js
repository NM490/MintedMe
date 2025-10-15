'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Portfolio } from '@/components/Portfolio';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { Toaster } from '@/components/ui/sonner';
import { Sparkles, Zap } from 'lucide-react';
import { sdk } from "@farcaster/miniapp-sdk";
import { useFirstLoad } from '@/hooks/useFirstLoad';




const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const isFirstLoad = useFirstLoad();

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            if (document.readyState === 'complete') {
              resolve();
            } else {
              window.addEventListener('load', () => resolve(), { once: true });
            }
          });
        }

        await sdk.actions.ready();
        console.log("Farcaster SDK initialized successfully - app fully loaded");
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
        setTimeout(async () => {
          try {
            await sdk.actions.ready();
            console.log('Farcaster SDK initialized on retry');
          } catch (retryError) {
            console.error('Farcaster SDK retry failed:', retryError);
          }
        }, 1000);
      }
    };
    initializeFarcaster();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0014]">
      {/* Dark purple animated gradient background */}
      <div className="fixed inset-0 animated-gradient -z-10" />

      {/* Purple blur orbs for depth */}
      <motion.div
        className="blur-circle w-[500px] h-[500px] bg-purple-600/30 top-0 -left-48"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="blur-circle w-[500px] h-[500px] bg-violet-600/30 bottom-0 -right-48"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="blur-circle w-[400px] h-[400px] bg-fuchsia-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <Toaster />
      <Header />
      <MobileNav />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-12">
        <motion.div
          className="text-center space-y-6"
          variants={containerVariants}
          initial={isFirstLoad ? "hidden" : "visible"}
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full border border-purple-500/20">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-white">
              Powered by Base OnChainKit
            </span>
            <Zap className="h-4 w-4 text-violet-400" />
          </motion.div>

          {/* Main heading */}
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white leading-tight">
            <span className="block">Build Your</span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent neon-text">
              On-Chain Legacy
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Transform your projects into verifiable NFTs. Showcase your work with
            blockchain-backed proof of authenticity.
          </motion.p>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 pt-8">
            <motion.div
              className="glass-card px-6 py-3 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-purple-300">Verified</div>
            </motion.div>
            <motion.div
              className="glass-card px-6 py-3 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white">On-Chain</div>
              <div className="text-xs text-purple-300">Forever</div>
            </motion.div>
            <motion.div
              className="glass-card px-6 py-3 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white">Base</div>
              <div className="text-xs text-purple-300">Sepolia</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-32 md:pb-24">
        <Portfolio />
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-purple-500/20 glass mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-purple-200 font-medium">
              Built with 💎 on Base by Modu
            </p>
            <p className="text-xs text-purple-300/70">
              Empowering the next generation of builders
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
