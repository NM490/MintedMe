"use client";
import { Moon, Sun, Menu, X } from "lucide-react";
import Image from "next/image";
import WalletSheet from "../features/WalletSheet";
import WalletAccount from "../features/WalletAccount";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const navBtns = [
    { text: "Home", url: "/", id: "home-nav" },
    { text: "My Portfolio", url: "/project", id: "project-nav" },
    { text: "Browse Portfolios", url: "/browse", id: "browse-project-nav" },
    { text: "About", url: "/about", id: "about-nav" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Force dark mode on initial render
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-4 z-50">
      {/* Main Header */}
      <div
        style={{ gridTemplateColumns: 'auto 1fr auto' }}
        className="mx-auto max-w-6xl px-4 py-2 grid items-center bg-white/5 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-full shadow-2xl shadow-black/10"
      >
        {/* Left - Logo */}
        <Link href="/" aria-label="Home" className="flex items-center gap-3 hover:opacity-90 transition justify-start pl-2">
          <div className="flex flex-col items-center gap-1 h-10 overflow-visible">
            <div className="relative h-10 w-10 overflow-visible">
              <Image
                src="/minted.svg"
                alt="Logo"
                width={400}
                height={0}
                className="absolute inset-0 transform scale-200 invert"
              />
            </div>
          </div>
        </Link>

        {/* Center - Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 justify-center">
          {navBtns.map((btn) => (
            <Link
              key={btn.id}
              href={btn.url}
              className="text-md text-foreground hover:transition hover:text-primary underline-offset-4 hover:underline dark:font-blod"
            >
              {btn.text}
            </Link>
          ))}
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center gap-3 justify-end pr-2">
          <WalletAccount />
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white/10 dark:bg-black/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/20 p-6">
            <nav className="flex flex-col gap-4">
              {navBtns.map((btn) => (
                <Link
                  key={btn.id}
                  href={btn.url}
                  className="text-lg text-white hover:text-brand py-3 px-4 rounded-lg hover:bg-white/10 transition text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {btn.text}
                </Link>
              ))}
            </nav>

            {/* Close button for mobile */}
            <button
              className="w-full mt-6 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}