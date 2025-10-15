import { Award, Wallet, Plus, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";




export function CardInfo({ icon, title, description }) {
  return (
    <Card className="group relative overflow-hidden  border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl flex flex-col justify-center items-center text-center h-full">
      <div className="relative z-10 w-full">
        <CardHeader className="pb-4 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0142d9] to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
            <div className="text-white">
              {icon}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-foreground bg-clip-text group-hover:text-purple-400 transition-all duration-500 text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CardDescription className="text-foreground/75 text-base leading-relaxed transition-colors duration-300 text-center max-w-md">
            {description}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}

export const card1 = {
  icon: <Award className="w-7 h-7" />,
  title: "Share Portfolio",
  description: "Get a shareable link to your verified portfolio for employers and recruiters worldwide.",
};

export const card2 = {
  icon: <Wallet className="w-7 h-7" />,
  title: "Connect Wallet",
  description: "Sign in securely with your crypto wallet using MetaMask, WalletConnect, or other providers.",
};

export const card3 = {
  icon: <Plus className="w-7 h-7" />,
  title: "Mint Projects",
  description: "Upload project details and mint them as verifiable NFTs on the blockchain network.",
};

export const card4 = {
  icon: <Search className="w-7 h-7" />,
  title: "Search Projects",
  description: "Browse other people's project by searching their wallet address.",
};