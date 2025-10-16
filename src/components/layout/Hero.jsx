import Image from "next/image";
import { CardInfo, card1, card2, card3, card4 } from "./CardInfo";
import Spline from "@splinetool/react-spline";


export default function Hero() {
  return (
    <>
    
    <div className="w-full min-h-screen">
           <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 md:mb-28">
            {/* Text Content */}
            <div className="flex-1 space-y-8 text-center lg:text-start">
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
              <div className="relative w-full max-w-md">
                <Image
                  src="/mint.png"
                  alt="MintedMe NFT Portfolio"
                  width={800}
                  height={800}
                  className="w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

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
      </main>
    </div>
    </>
  );
}
