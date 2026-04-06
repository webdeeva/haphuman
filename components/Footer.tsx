import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">H</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white">HAP</span>
              <span className="text-xs text-slate-600 font-mono ml-2">haphuman.xyz</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-500">
            <Link href="#protocol" className="hover:text-cyan-400 transition-colors">Protocol</Link>
            <Link href="#framework" className="hover:text-cyan-400 transition-colors">Framework</Link>
            <Link href="#score" className="hover:text-cyan-400 transition-colors">Score</Link>
            <Link href="/whitepaper" className="hover:text-cyan-400 transition-colors">Whitepaper</Link>
            <Link href="#join" className="hover:text-cyan-400 transition-colors">Join</Link>
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono text-slate-600">
            © 2025 HAP · Human Authorship Protocol
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-slate-700">
            Authorship is not defined by output alone. It is defined by the system that creates it.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono text-amber-500/70 tracking-wide">
              Coming to the Guapcoin Blockchain
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
