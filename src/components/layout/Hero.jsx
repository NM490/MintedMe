"use client";
import Image from "next/image";
import { CardInfo, card1, card2, card3, card4 } from "./CardInfo";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ForegroundCarousel({ images = [], index = 0, setIndex }) {
  const imgs = images.slice(0, 5);

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIndex((i) => (i + 1) % imgs.length);

  return (
    <div className="w-full max-w-4xl mx-auto relative z-30 pointer-events-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative pb-[60%]">{/* slightly taller responsive aspect */}
          <AnimatePresence initial={false} mode="wait">
            {imgs.map((src, i) =>
              i === index ? (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt={`slide-${i}`}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 z-30"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 z-30"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute left-0 right-0 bottom-3 flex items-center justify-center gap-2 z-30">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BackgroundCarousel({ images = [], index = 0, setIndex, autoPlay = true, interval = 8000 }) {
  const imgs = images.slice(0, 5);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused || imgs.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % imgs.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [imgs.length, isPaused, autoPlay, interval, setIndex]);

  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none">
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          {imgs.map((src, i) =>
            i === index ? (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`bg-${i}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="100vw"
                />
                <div className="absolute inset-0 backdrop-blur-md bg-black/85 pointer-events-none" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Hero() {
  const defaultImages = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg",
    "/slide5.jpg",
  ];
  const [index, setIndex] = useState(0);

  return (
    <>
      <BackgroundCarousel images={defaultImages} index={index} setIndex={setIndex} />
      <div className="w-full min-h-screen">
        
        <main className="container mx-auto px-6 py-16 w-full">
          <div className="w-full">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 md:mb-28">
            {/* Text Content */}
            <div className="flex-1 space-y-8 py-36 text-center lg:text-start">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight">
                  <span className="font-minted">MintedMe</span>
                  <span className="inline-block -ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#0142d9] to-[#6b21a8]">
                    Verifiable NFTs
                  </span>
                </h1>
                <p className="text-sm md:text-xl text-balance max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Transform your academic and personal projects into blockchain-verified credentials. Create an immutable portfolio that employers and educators can trust.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="px-8 py-4 bg-gradient-to-r from-[#0142d9] to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border border-gray-300 font-semibold rounded-xl hover:text-purple-600 hover:bg-white hover:border-white transition-all duration-300 transform hover:scale-105">
                  View Examples
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <ForegroundCarousel images={defaultImages} index={index} setIndex={setIndex} />
            </div>
          </div>
          <div className="w-full rounded-2xl p-8">
          {/* Features Section */}
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-minted font-bold bg-clip-text">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Everything you need to showcase your work with <span className="text-purple-600 ">credibility</span> and <span className="text-purple-600">style</span>
            </p>
          </div>

          {/* Modern Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center justify-center">
            <CardInfo {...card1} />
            <CardInfo {...card2} />
            <CardInfo {...card3} />
          </div>
          <div className="grid md:grid-cols-1 pt-8 gap-8 max-w-5xl mx-auto">
            <CardInfo {...card4} />
          </div>
        </div>
        </div>
      </main>
    </div>
    </>
  );
}
