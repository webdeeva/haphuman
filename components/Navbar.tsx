"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Protocol", href: "#protocol" },
  { label: "Framework", href: "#framework" },
  { label: "Score", href: "#score" },
  { label: "Vision", href: "#vision" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Studio", href: "/studio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-cyan-500/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg animated-border p-[1px]">
              <div className="w-full h-full rounded-[7px] bg-bg-primary flex items-center justify-center">
                <span className="font-mono text-xs font-bold gradient-text">H</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-widest text-white">HAP</span>
            <span className="text-[9px] text-muted tracking-[0.2em] uppercase font-mono opacity-60">
              haphuman.xyz
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-mono tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#join"
            className="px-4 py-2 rounded-lg animated-border p-[1px] group"
          >
            <span className="flex items-center px-3 py-1.5 rounded-[7px] bg-bg-primary text-sm font-medium text-cyan-400 group-hover:text-white transition-colors duration-200 font-mono">
              Join Protocol
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-400 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-cyan-500/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-mono"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-cyan-400 font-mono border border-cyan-500/30 rounded-lg px-4 py-2 text-center hover:bg-cyan-500/10 transition-colors"
              >
                Join Protocol
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
