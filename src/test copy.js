'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Identity, Address, EthBalance } from '@coinbase/onchainkit/identity';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Blocks } from 'lucide-react';
import { useFirstLoad } from '@/hooks/useFirstLoad';

export function Header() {
  const pathname = usePathname();
  const isFirstLoad = useFirstLoad();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <motion.header
      className="sticky top-4 z-50 mx-4"
      initial={isFirstLoad ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <div className="glass rounded-2xl px-6 py-4 shadow-2xl border border-purple-500/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-violet-600 p-3 rounded-xl">
                    <Blocks className="h-7 w-7 text-white" />
                  </div>
                </motion.div>
              </Link>
              <div>
                <Link href="/">
                  <h1 className="text-2xl font-bold text-white neon-text cursor-pointer hover:text-purple-300 transition-colors">
                    ChainFolio
                  </h1>
                </Link>
                <p className="text-xs text-purple-200">
                  Web3 Student Portfolio
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive('/')
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg neon-glow'
                      : 'text-purple-200 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  My Portfolio
                </motion.div>
              </Link>
              <Link href="/explore">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive('/explore')
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg neon-glow'
                      : 'text-purple-200 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  Browse Portfolio
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive('/about')
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg neon-glow'
                      : 'text-purple-200 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  About Us
                </motion.div>
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <Wallet>
                <ConnectWallet className="glass-card hover:glass transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                  <Avatar className="h-6 w-6" />
                  <Name className="font-semibold" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2 glass-card" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
