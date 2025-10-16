"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import WalletAccount from "../features/WalletAccount";

export default function Header() {
  const navBtns = [
    { text: "Home", url: "/", id: "home-nav" },
    { text: "My Portfolio", url: "/project", id: "project-nav" },
    { text: "Browse Portfolios", url: "/browse", id: "browse-project-nav" },
    { text: "About", url: "/about", id: "about-nav" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-4 z-50">
      <div className="flex justify-center w-full m-auto">
        <div
          className="relative flex items-center w-full max-w-6xl mx-5 px-4 py-5 md:py-2
                     bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20
                     border border-white/20 backdrop-blur-2xl rounded-full
                     shadow-2xl shadow-black/10"
        >
          {/* Left - Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-3 hover:opacity-90 transition z-10"
          >
            <div className="relative h-10 w-10">
              <Image
                src="/minted.svg"
                alt="Logo"
                width={400}
                height={0}
                className="absolute inset-0 transform scale-200 invert"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 z-0">
            {navBtns.map((btn) => {
              const isActive = pathname === btn.url;
              return (
                <Link
                  key={btn.id}
                  href={btn.url}
                  className={`text-md font-medium text-white transition px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-white/20 text-cyan-300"
                      : "hover:text-primary hover:brightness-150"
                  }`}
                >
                  {btn.text}
                </Link>
              );
            })}
          </nav>

          {/* Right - Wallet and Mobile Menu Button */}
          <div className="flex items-center gap-3 justify-end ml-auto z-10">
            <WalletAccount />
            <button
              className="lg:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Fullscreen backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Navbar + Panel */}
            <motion.div
              className="relative z-10 flex flex-col w-full max-w-md mx-auto mt-20 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-600/30 border border-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Navbar Links */}
              <nav className="flex flex-col gap-2 p-4">
                {navBtns.map((btn) => {
                  const isActive = pathname === btn.url;
                  return (
                    <Link
                      key={btn.id}
                      href={btn.url}
                      className={`text-lg text-white py-3 px-4 rounded-lg text-center font-medium transition ${
                        isActive
                          ? "bg-white/20 text-cyan-300"
                          : "hover:text-cyan-300 hover:bg-white/10"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {btn.text}
                    </Link>
                  );
                })}
              </nav>

              {/* Panel below navbar */}
              <div className="p-4 border-t border-white/20 flex flex-col gap-3">
                <WalletAccount />
                {/* Additional panel content can go here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
