import { CardInfo } from "@/components/layout/CardInfo";
import { card1, card2, card3 } from "@/components/layout/CardInfo";

export default function Home() {
  return (
    <div className="w-full grow flex flex-co justify-center h-fit">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl my-auto text-center justify-center space-y-12 w-full mx-auto">
          <div className="space-y-6 h-screen text-start items-start justify-start">
            <h1 className="text-6xl font-bold text-balance leading-tight text-start">
              Showcase Your Projects as{" "}
              <span className="text-[#0142d9]">Verifiable NFTs</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl leading-relaxed text-start">
              Transform your academic and personal projects into
              blockchain-verified credentials. Create an immutable portfolio
              that employers and educators can trust.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <CardInfo {...card1} />
            <CardInfo {...card2} />
            <CardInfo {...card3} />
          </div>
        </div>
      </main>
    </div>
  );
}
