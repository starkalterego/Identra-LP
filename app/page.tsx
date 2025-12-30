import { Hero } from "@/components/sections/Hero";
import { ProblemInsight } from "@/components/sections/ProblemInsight";
import { HowIdentraWorks } from "@/components/sections/HowIdentraWorks";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { SecurityTrust } from "@/components/sections/SecurityTrust";
import { Differentiation } from "@/components/sections/Differentiation";
import { DownloadFooter } from "@/components/sections/DownloadFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <ProblemInsight />
      <HowIdentraWorks />
      <ProductExperience />
      <SecurityTrust />
      <Differentiation />
      <DownloadFooter />
    </main>
  );
}
