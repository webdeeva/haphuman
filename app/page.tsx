import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CorePrinciples from "@/components/CorePrinciples";
import WhatHAPTracks from "@/components/WhatHAPTracks";
import ContributionScore from "@/components/ContributionScore";
import BlockchainSection from "@/components/BlockchainSection";
import UseCases from "@/components/UseCases";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";
import CopyForLLM from "@/components/CopyForLLM";

export default function HomePage() {
  return (
    <main className="relative">
      <HomeClient />
      <CopyForLLM />
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CorePrinciples />
      <WhatHAPTracks />
      <ContributionScore />
      <BlockchainSection />
      <UseCases />
      <JoinSection />
      <Footer />
    </main>
  );
}
