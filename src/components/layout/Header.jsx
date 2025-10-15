"use client";
import { Moon, Sun } from "lucide-react";
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

  // Force dark mode on initial render
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <header className="sticky top-4 z-50">
      <div style={{ gridTemplateColumns: 'auto 1fr auto' }} className="mx-auto max-w-6xl px-4 py-2 grid items-center bg-white/10 dark:bg-black/40 border border-white/10 dark:border-black/30 backdrop-blur-md rounded-full shadow-lg">

        {/* Left - Logo */}
        <Link href="/" aria-label="Home" className="flex items-center gap-3 hover:opacity-90 transition justify-start pl-2">
          <div className="flex flex-col items-center gap-1 h-10 overflow-visible">
            <div className="relative h-10 w-10 overflow-visible">
              <Image
                src="/minted.svg"
                alt="Logo"
                width={100}
                height={0}
                className="absolute inset-0 w-10 h-10 transform scale-220 -translate-y-1"
              />
            </div>
          </div>
        </Link>

        {/* Center - Nav */}
        <nav className="hidden md:flex items-center gap-4 justify-center">
          {navBtns.map((btn) => (
            <Link
              key={btn.id}
              href={btn.url}
              className="text-sm text-foreground hover:transition hover:text-brand underline-offset-4 hover:underline"
            >
              {btn.text}
            </Link>
          ))}
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center gap-3 justify-end pr-2">
          <WalletAccount />
        </div>
      </div>
    </header>
  );
}