"use client";
import { useState } from "react";
import Link from "next/link";

const links = [["Protocol", "/#protocol"], ["Written works", "/#works"], ["Whitepaper", "/whitepaper"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="hap-nav"><nav className="hap-wrap" aria-label="Main navigation"><Link className="hap-brand" href="/" aria-label="HAP home"><span className="brand-symbol" aria-hidden="true">↗</span>HAP<span className="brand-description">Human Authorship<br />Protocol</span></Link><div className="desktop-nav">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="nav-studio" href="/studio">Open Studio ↗</Link></div><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button></nav>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links, ["Open Studio ↗", "/studio"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}</header>;
}
