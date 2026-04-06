"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <>
      <div className="scan-line" />
      <ParticleBackground />
    </>
  );
}
