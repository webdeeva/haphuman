"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function JoinSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) { setErrorMsg("Please fill in all fields."); setStatus("error"); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
        setRole("");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section ref={ref} id="join" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(6,182,212,0.3) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-cyan-500/60" />
          <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
            Join the Fight
          </span>
          <div className="h-px w-8 bg-cyan-500/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Maintain humanity</span>
          <br />
          <span className="gradient-text">in AI-driven work</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          HAP is the foundation for a new creative economy. Join creators, developers,
          and platforms establishing the standard for authorship in the age of AI.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 max-w-lg mx-auto mb-16"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <p className="text-white font-bold text-lg">You&apos;re in the protocol.</p>
              <p className="text-slate-400 text-sm">
                We&apos;ll be in touch as we build the standard together.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono text-white placeholder-slate-600 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(4,8,18,0.8)",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(6,182,212,0.6)";
                    e.target.style.boxShadow = "0 0 20px rgba(6,182,212,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(6,182,212,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    background: "rgba(4,8,18,0.8)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    color: role ? "#E2E8F0" : "#475569",
                  }}
                >
                  <option value="" disabled>I am a...</option>
                  <option value="creator">Creator / Artist</option>
                  <option value="developer">Developer / Builder</option>
                  <option value="platform">Platform / Company</option>
                  <option value="researcher">Researcher / Academic</option>
                  <option value="investor">Investor</option>
                </select>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                  <AlertCircle size={12} />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 font-mono disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.25)",
                }}
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Join the Protocol
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Bottom callouts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 font-mono"
        >
          {[
            "Open standard",
            "No lock-in",
            "Built for creators",
            "Chain-agnostic",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-500/50" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
