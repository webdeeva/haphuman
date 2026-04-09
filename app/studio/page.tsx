import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Music, Shield, Zap } from "lucide-react";

export const metadata = {
  title: "HAP Studio - Human Authorship Protocol",
  description: "Log your creative decisions and generate a verifiable HAP authorship record.",
};

const features = [
  {
    icon: <Music className="w-5 h-5" />,
    title: "Music Domain",
    desc: "Optimized for AI-assisted music: recipe, voice, lyrics, iterations, curation.",
    color: "#06B6D4",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Verifiable Record",
    desc: "Your creative decisions are hashed and anchored on Guapcoin. Immutable proof.",
    color: "#8B5CF6",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "IPFS Pinned",
    desc: "The full HAP record is pinned to IPFS. Content-addressed and permanent.",
    color: "#10B981",
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 font-mono text-xs"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#06B6D4" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            HAP Studio - Music Domain
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Document your
            <br />
            <span className="gradient-text">creative authorship</span>
          </h1>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Log the human decisions behind your AI-assisted track. Get a verifiable HAP record,
            an HCS score, and an on-chain anchor — in under 5 minutes.
          </p>

          <Link
            href="/studio/create"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              boxShadow: "0 0 40px rgba(6,182,212,0.3)",
            }}
          >
            Start a new record
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-5 mt-20">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-6 text-left"
                style={{ borderColor: `${f.color}18` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}12`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Steps preview */}
          <div className="mt-16 glass rounded-2xl p-8 text-left"
            style={{ border: "1px solid rgba(6,182,212,0.15)" }}>
            <p className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase mb-6">5 steps · ~5 minutes</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {["Recipe", "Voice", "Inputs", "Iteration", "Curation"].map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0"
                    style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.2)" }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-300 font-mono">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
